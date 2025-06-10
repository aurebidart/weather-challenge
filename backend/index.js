// index.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import Redis from 'ioredis';
import weatherRoutes from './src/routes/weather.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middlewares…
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

export const redisClient = new Redis(process.env.REDIS_URL);
app.use('/api/weather', weatherRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// only start listening if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// export the app for Supertest
export default app;
