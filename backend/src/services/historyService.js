import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function saveSearch(city, country, data) {
  return prisma.weatherHistory.create({
    data: { city, country, data }
  });
}
export async function deleteAllHistory() {
  // Deletes every record in the weatherHistory table
  return prisma.weatherHistory.deleteMany({});
}
