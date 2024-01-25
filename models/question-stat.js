import { Schema, model, models } from 'mongoose';

const QuestionStatSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    testId: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    avgTime: {
        type: Number,
        required: true,
        default: 0
    },
    avgScore: {
        type: Number,
        required: true,
        default: 0
    },
    attempts: {
        type: Number,
        required: true,
        default: 0
    },
    correctAttempts: {
        type: Number,
        required: true,
        default: 0
    },
});

const QuestionStat = models.QuestionStat || model('QuestionTest', QuestionStatSchema)

export default QuestionStat;
