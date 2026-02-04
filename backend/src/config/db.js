import mongoose from 'mongoose';

import { env } from './env.js';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.DB_URL);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}