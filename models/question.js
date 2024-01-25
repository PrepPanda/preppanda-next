import { Schema, model, models } from 'mongoose';

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            required: true,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;

