import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function addFavorite(city, country) {
  return prisma.favoriteCity.create({
    data: { city, country }
  });
}

export function listFavorites() {
  return prisma.favoriteCity.findMany({
    orderBy: { addedAt: 'desc' }
  });
}

export function removeFavorite(id) {
  return prisma.favoriteCity.delete({
    where: { id: Number(id) }
  });
}
