import { Schema, model, models } from 'mongoose';

const TestStatSchema = new Schema({
    testId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Test'
    },
    attempts: {
        type: Number,
        required: true,
        default: 0
    },
    avgScore: {
        type: Number,
        required: true,
        default: 0
    },
    avgTime: {
        type: Number,
        required: true,
        default: 0
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'QuestionStat'
    }]
});

const TestStat = models.TestStat || model('TestStat', TestStatSchema)

export default TestStat;
