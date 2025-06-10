import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function saveSearch(city, country, data) {
  return prisma.weatherHistory.create({
    data: { city, country, data }
  });
}
