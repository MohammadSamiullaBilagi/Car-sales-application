import express from 'express'
import path from 'path'

import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express()

const __dirname = path.resolve()

app.use(express.json());
app.use(clerkMiddleware()); 
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'SUCCESS' })
})

app.use(express.static(path.join(__dirname, 'public')))

// Remove the duplicate server start - you're calling it twice!
const startServer = async () => {
    await connectDB();
    app.listen(env.PORT, () => {
        console.log(`Server is running on ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
};

startServer();