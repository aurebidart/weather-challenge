import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function searchCities(req, res, next) {
  const q = req.query.q?.trim().toLowerCase() || '';
  if (!q) return res.json([]);

  try {
    const results = await prisma.city.findMany({
      where: {
        name: { startsWith: q, mode: 'insensitive' }
      },
      orderBy: { name: 'asc' },
      take: 10
    });
    res.json(results);
  } catch (err) {
    next(err);
  }
}
