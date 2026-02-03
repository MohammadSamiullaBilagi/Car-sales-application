import express from 'express'
import path from 'path'

import { env } from './config/env.js'

const app = express()
// const port = 3000

const __dirname = path.resolve()


app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'SUCCESS' })
})

// make your app ready for deployment

if(env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../admin/dist')))

    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin','dist','index.html'))
    });
}

app.use(express.static(path.join(__dirname, 'public')))
app.listen(env.PORT, () => {
    console.log(`Server is running on ${env.NODE_ENV} mode`)
})


