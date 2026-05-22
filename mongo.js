const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/insyncDB")
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch(() => {
        console.log("failed")
    })

// Schema for Join Us form
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("JoinMembers", schema)

module.exports = collection