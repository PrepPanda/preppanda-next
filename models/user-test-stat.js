import { Schema, model, models } from "mongoose";

const UserTestStatSchema = new Schema({
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


const UserTestStat = models.UserTestStat || model("UserTestStat", UserTestStatSchema);

export default UserTestStat;
