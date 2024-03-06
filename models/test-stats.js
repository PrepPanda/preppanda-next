// Description: Stores the test Stats { testId, avgTime, avgScore, attempts, questions }


import { Schema, model, models } from 'mongoose';

const TestStatsSchema = new Schema({
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
        ref: 'QuestionStats'
    }]
});

const TestStats = models.TestStats || model('TestStats', TestStatsSchema)

export default TestStats;


