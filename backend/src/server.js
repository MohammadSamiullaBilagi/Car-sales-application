import express from 'express'
const app = express()
const port = 3000

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'SUCCESS' })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


