import { LLMService } from "../rag/llm.service";

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

export const AIService = {
  generateProductData,
};
