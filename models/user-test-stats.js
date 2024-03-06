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
        default: 0,
    },
    avgScore: {
        type: Number,
        default: 0,
    },
    avgTime: {
        type: Number,
        default: 0,
    },
    questions: [
        {
        type: Schema.Types.ObjectId,
        ref: "QuestionStats",
        },
    ],
});


const UserTestStats = models.UserTestStats || model("UserTestStats", UserTestStatsSchema);

export default UserTestStats;


