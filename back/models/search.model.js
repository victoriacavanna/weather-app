import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

export default mongoose.model('Weather', weatherSchema)