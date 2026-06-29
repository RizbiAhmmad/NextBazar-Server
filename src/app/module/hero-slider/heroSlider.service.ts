import { Request } from "express";
import { prisma } from "../../lib/prisma";

const createHeroSlider = async (req: Request) => {
  const file = req.file as any;
  if (!file) {
    throw new Error("No image file uploaded");
  }

  const result = await prisma.heroSlider.create({
    data: {
      image: file.path,
    },
  });

  return result;
};

const getHeroSliders = async () => {
  const result = await prisma.heroSlider.findMany({
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const deleteHeroSlider = async (id: string) => {
  const result = await prisma.heroSlider.delete({
    where: { id },
  });
  return result;
};

export const HeroSliderService = {
  createHeroSlider,
  getHeroSliders,
  deleteHeroSlider,
};
