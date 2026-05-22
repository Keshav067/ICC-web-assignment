const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const collection = require('./mongo')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve HTML, CSS, JS, images from this folder
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Handle Join Us form submission
app.post('/join', async (req, res) => {
    try {
        const { name, email } = req.body
        await collection.create({ name, email })
        res.json({ message: "Successfully joined INSYNC!" })
    } catch (error) {
        console.log(error)
        res.json({ message: "Something went wrong" })
    }
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})