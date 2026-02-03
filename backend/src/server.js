import express from 'express'
import path from 'path'

import { env } from './config/env.js'

const app = express()

const __dirname = path.resolve()


app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'SUCCESS' })
})

// Remove the production static file serving block entirely
// Admin frontend is deployed separately on Vercel

app.use(express.static(path.join(__dirname, 'public')))

app.listen(env.PORT, () => {
    console.log(`Server is running on ${env.NODE_ENV} mode`)
})