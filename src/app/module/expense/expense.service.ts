import status from "http-status";
import { prisma } from "../../lib/prisma";
import AppError from "../../errorHelpers/AppError";
import { IQueryParams } from "../../interfaces/query.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { sumByPeriod } from "../../utils/periodSummary";

const getShopForVendor = async (vendorId: string) => {
  const shop = await prisma.shop.findUnique({ where: { vendorId } });
  if (!shop) {
    throw new AppError(status.NOT_FOUND, "You don't have a shop yet");
  }
  return shop;
};

// ── Expense Categories ──────────────────────────────────────────────

const createCategory = async (vendorId: string, payload: { name: string }) => {
  const shop = await getShopForVendor(vendorId);

  return prisma.expenseCategory.create({
    data: { name: payload.name, shopId: shop.id },
  });
};

const getMyCategories = async (vendorId: string, queryParams: IQueryParams) => {
  const shop = await getShopForVendor(vendorId);

  return new QueryBuilder(prisma.expenseCategory, queryParams, {
    searchableFields: ["name"],
    filterableFields: ["isActive"],
  })
    .search()
    .filter()
    .where({ shopId: shop.id })
    .sort()
    .paginate()
    .execute();
};

const updateCategory = async (
  vendorId: string,
  id: string,
  payload: { name?: string; isActive?: boolean },
) => {
  const shop = await getShopForVendor(vendorId);

  const category = await prisma.expenseCategory.findUnique({ where: { id } });
  if (!category) throw new AppError(status.NOT_FOUND, "Expense category not found");
  if (category.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "You can only update your own expense categories");
  }

  return prisma.expenseCategory.update({ where: { id }, data: payload });
};

const deleteCategory = async (vendorId: string, id: string) => {
  const shop = await getShopForVendor(vendorId);

  const category = await prisma.expenseCategory.findUnique({ where: { id } });
  if (!category) throw new AppError(status.NOT_FOUND, "Expense category not found");
  if (category.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own expense categories");
  }

  const expenseCount = await prisma.expense.count({ where: { categoryId: id } });
  if (expenseCount > 0) {
    throw new AppError(
      status.BAD_REQUEST,
      "Cannot delete a category that has expenses. Deactivate it instead.",
    );
  }

  await prisma.expenseCategory.delete({ where: { id } });
  return { message: "Expense category deleted successfully" };
};

// ── Expenses ─────────────────────────────────────────────────────────

const createExpense = async (
  vendorId: string,
  payload: { categoryId: string; name: string; price: number; note?: string; date: string },
) => {
  const shop = await getShopForVendor(vendorId);

  const category = await prisma.expenseCategory.findUnique({
    where: { id: payload.categoryId },
  });
  if (!category || category.shopId !== shop.id) {
    throw new AppError(status.BAD_REQUEST, "Invalid expense category");
  }

  return prisma.expense.create({
    data: {
      name: payload.name,
      price: payload.price,
      note: payload.note,
      date: new Date(payload.date),
      categoryId: payload.categoryId,
      shopId: shop.id,
    },
    include: { category: { select: { id: true, name: true } } },
  });
};

const getMyExpenses = async (
  vendorId: string,
  queryParams: IQueryParams & { startDate?: string; endDate?: string },
) => {
  const shop = await getShopForVendor(vendorId);

  const { startDate, endDate, ...rest } = queryParams;

  let dateFilter: { gte?: Date; lte?: Date } | undefined;
  if (startDate || endDate) {
    dateFilter = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
  }

  return new QueryBuilder(prisma.expense, rest, {
    searchableFields: ["name", "note"],
    filterableFields: ["categoryId"],
  })
    .search()
    .filter()
    .where({ shopId: shop.id, ...(dateFilter && { date: dateFilter }) })
    .sort()
    .paginate()
    .include({ category: { select: { id: true, name: true } } })
    .execute();
};

const updateExpense = async (
  vendorId: string,
  id: string,
  payload: {
    categoryId?: string;
    name?: string;
    price?: number;
    note?: string;
    date?: string;
  },
) => {
  const shop = await getShopForVendor(vendorId);

  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new AppError(status.NOT_FOUND, "Expense not found");
  if (expense.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "You can only update your own expenses");
  }

  if (payload.categoryId) {
    const category = await prisma.expenseCategory.findUnique({
      where: { id: payload.categoryId },
    });
    if (!category || category.shopId !== shop.id) {
      throw new AppError(status.BAD_REQUEST, "Invalid expense category");
    }
  }

  return prisma.expense.update({
    where: { id },
    data: {
      ...(payload.name !== undefined && { name: payload.name }),
      ...(payload.price !== undefined && { price: payload.price }),
      ...(payload.note !== undefined && { note: payload.note }),
      ...(payload.date !== undefined && { date: new Date(payload.date) }),
      ...(payload.categoryId !== undefined && { categoryId: payload.categoryId }),
    },
    include: { category: { select: { id: true, name: true } } },
  });
};

const deleteExpense = async (vendorId: string, id: string) => {
  const shop = await getShopForVendor(vendorId);

  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new AppError(status.NOT_FOUND, "Expense not found");
  if (expense.shopId !== shop.id) {
    throw new AppError(status.FORBIDDEN, "You can only delete your own expenses");
  }

  await prisma.expense.delete({ where: { id } });
  return { message: "Expense deleted successfully" };
};

const getExpenseReportSummary = async (vendorId: string) => {
  const shop = await getShopForVendor(vendorId);

  const expenses = await prisma.expense.findMany({
    where: { shopId: shop.id },
    select: { price: true, date: true },
  });

  return sumByPeriod(expenses.map((expense) => ({ amount: expense.price, date: expense.date })));
};

export const ExpenseService = {
  createCategory,
  getMyCategories,
  updateCategory,
  deleteCategory,
  createExpense,
  getMyExpenses,
  updateExpense,
  deleteExpense,
  getExpenseReportSummary,
};
