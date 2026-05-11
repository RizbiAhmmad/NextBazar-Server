import { LLMService } from "../rag/llm.service";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";
import { Role } from "../../../generated/prisma/enums";

const generateProductData = async (title: string) => {
  const llmService = new LLMService();
  const prompt = `You are an expert e-commerce copywriter. Based on the product title '${title}', generate a detailed and engaging product description and SEO tags.
  
  Return the response as a JSON object with the following fields:
  1. 'description': A detailed HTML formatted description (using <p>, <ul>, <li>, <strong> tags) including features and benefits.
  2. 'shortDescription': A catchy 1-2 sentence summary for social media or preview.
  3. 'tags': An array of 5 SEO-friendly search keywords.
  
  Return ONLY the JSON object. Do not include markdown code blocks.`;

  const response = await llmService.generateResponse(prompt, [], true);

  // Clean up the response if it contains any accidental markdown
  const cleanedResponse = response.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedResponse);
};

const getRecommendations = async (productId: string) => {
  // 1. Fetch the current product
  const currentProduct = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  if (!currentProduct) {
    throw new AppError(status.NOT_FOUND, "Product not found");
  }

  // 2. Fetch up to 20 products from the same category (excluding current)
  const candidateProducts = await prisma.product.findMany({
    where: {
      categoryId: currentProduct.categoryId,
      id: { not: productId },
      stock: { gt: 0 },
    },
    take: 20,
    select: {
      id: true,
      name: true,
      shortDescription: true,
      sellPrice: true,
      images: true,
      tags: true,
    },
  });

  if (candidateProducts.length === 0) {
    return [];
  }

  // 3. Ask Gemini to pick the top 4 most relevant ones
  const llmService = new LLMService();
  const candidateList = candidateProducts
    .map(
      (p, i) =>
        `${i + 1}. ID: ${p.id} | Name: ${p.name} | Tags: ${p.tags?.join(", ")}`,
    )
    .join("\n");

  const prompt = `You are an AI recommendation engine for an e-commerce platform.

A customer is viewing this product:
- Name: "${currentProduct.name}"
- Category: "${currentProduct.category?.name}"
- Tags: "${currentProduct.tags?.join(", ")}"

From the following candidate products in the same category, select the TOP 4 most relevant recommendations.
Prioritize similarity in use-case, tags, and complementary items.

Candidates:
${candidateList}

Return ONLY a JSON array of exactly 4 product IDs (strings), like this:
["id1", "id2", "id3", "id4"]

Return ONLY the JSON array. No explanation, no markdown.`;

  const response = await llmService.generateResponse(prompt, [], true);
  const cleanedResponse = response.replace(/```json|```/g, "").trim();
  const recommendedIds: string[] = JSON.parse(cleanedResponse);

  // 4. Fetch the full recommended products
  const recommendations = await prisma.product.findMany({
    where: { id: { in: recommendedIds } },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      sellPrice: true,
      regularPrice: true,
      images: true,
      category: { select: { name: true } },
    },
  });

  // Return them in the same order Gemini suggested
  return recommendedIds
    .map((id) => recommendations.find((p) => p.id === id))
    .filter(Boolean);
};

const analyzeBusiness = async () => {
  // 1. Gather Rich Data for Analysis
  const [orderStats, categorySales, topProducts, sellerPerformance, summary] =
    await Promise.all([
      // Revenue Summary
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        _count: { id: true },
      }),
      // Sales by Category
      prisma.category.findMany({
        include: {
          products: {
            select: {
              orderItems: {
                select: {
                  price: true,
                  quantity: true,
                },
              },
            },
          },
        },
      }),
      // Top 5 Products by Quantity
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
      // Seller Performance (Shops with order counts)
      prisma.shop.findMany({
        select: {
          name: true,
          _count: {
            select: { orderItems: true },
          },
        },
        orderBy: { orderItems: { _count: "asc" } },
        take: 5,
      }),
      // Total counts
      prisma.$transaction([
        prisma.user.count({ where: { role: Role.USER } }),
        prisma.user.count({ where: { role: Role.SELLER } }),
      ]),
    ]);

  // Process category sales for easier reading by AI
  const processedCategorySales = (categorySales as any[])
    .map((cat) => ({
      name: cat.name,
      totalRevenue: cat.products.reduce(
        (acc: number, p: any) =>
          acc +
          p.orderItems.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
          ),
        0,
      ),
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Fetch top product names
  const topProductDetails = await prisma.product.findMany({
    where: { id: { in: topProducts.map((p) => p.productId) } },
    select: { name: true },
  });

  // 2. Prepare Prompt for Gemini
  const llmService = new LLMService();
  const context = {
    totalRevenue: orderStats._sum.totalAmount || 0,
    totalOrders: orderStats._count.id,
    totalCustomers: summary[0],
    totalSellers: summary[1],
    categoryPerformance: processedCategorySales,
    topSellingProducts: topProductDetails.map((p) => p.name),
    lowPerformingSellers: sellerPerformance.map(
      (s) => `${s.name} (${s._count.orderItems} sales)`,
    ),
  };

  const prompt = `You are a Business Analyst. Analyze this data:
  ${JSON.stringify(context, null, 2)}
  
  Return ONLY a JSON object: {"analysis": "HTML_STRING"}
  The HTML_STRING must use <h3>, <p>, <ul>, <li> tags for structure.
  Do not include any other text or markdown code blocks.`;

  const response = await llmService.generateResponse(prompt, [], true);

  let finalHTML = "";
  try {
    // Use regex to find the first { and last } to extract JSON even if there's extra text
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      finalHTML = parsedResponse.analysis || response;
    } else {
      finalHTML = response;
    }
  } catch (error) {
    // If parsing fails, try to clean common issues
    finalHTML = response.replace(/```json|```/g, "").trim();
  }

  return {
    insights: finalHTML,
    generatedAt: new Date().toISOString(),
  };
};

export const AIService = {
  generateProductData,
  getRecommendations,
  analyzeBusiness,
};
