import mongoose  from "mongoose";

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
})

export default mongoose.model('Test', TestSchema)
