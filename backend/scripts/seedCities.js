import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const raw = fs.readFileSync('./data/city.list.json', 'utf-8');
  const cities = JSON.parse(raw);

  // Insert in batches of 1k to avoid overwhelming
  const batchSize = 1000;
  for (let i = 0; i < cities.length; i += batchSize) {
    const batch = cities.slice(i, i + batchSize).map(c => ({
      id: c.id,
      name: c.name,
      state: c.state || null,
      country: c.country,
      lat: c.coord.lat,
      lon: c.coord.lon
    }));
    // ignore duplicates if rerunning
    await prisma.city.createMany({
      data: batch,
      skipDuplicates: true
    });
    console.log(`Seeded cities ${i}–${i + batch.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
