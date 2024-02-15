// Description: Store the test stats for user { userId, testId, attempts, avgScore, questions }


import { Schema, model, models } from "mongoose";

const UserTestStatsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    testId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Test",
    },
    attempts: {
        type: Number,
        required: true,
        default: 0,
    },
    avgScore: {
        type: Number,
        required: true,
        default: 0,
    },
    avgTime: {
        type: Number,
        required: true,
        default: 0,
    },
    questions: [
        {
        type: Schema.Types.ObjectId,
        ref: "QuestionStat",
        },
    ],
});


const UserTestStats = models.UserTestStats || model("UserTestStats", UserTestStatsSchema);

export default UserTestStats;


