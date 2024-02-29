// Description: Store question { question, options, correctAnswer }


import { Schema, model, models } from 'mongoose';

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    options: [
        {
            type: String,
        },
    ],
    correctAnswer: {
        type: String,
        required: true,
    },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;


