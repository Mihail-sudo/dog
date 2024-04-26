import mongoose  from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: String,
    questions: Array,
    answer: Number
})

export default mongoose.model('Question', QuestionSchema)
