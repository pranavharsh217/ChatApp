import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { createClient } from 'redis';
import userRoutes from './routes/user.js'
dotenv.config();

// Connect to MongoDB
connectDb();

// Ensure REDIS_URL is defined
if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in environment variables");
}

// Create Redis client
export const redisClient = createClient({
  url: process.env.REDIS_URL!, // non-null assertion
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect(); // Connect to Redis

// Create Express app
const app = express();

// Middleware
app.use("api/v1",userRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
