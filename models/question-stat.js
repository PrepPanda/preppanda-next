// Description: Stores the questions Stats { question, avgTime, avgScore, attempts, correctAttempts }

import { Schema, model, models } from "mongoose";

const QuestionStatsSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  testOrUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  avgTime: {
    type: Number,
    required: true,
    default: 0,
  },
  avgScore: {
    type: Number,
    required: true,
    default: 0,
  },
  attempts: {
    type: Number,
    required: true,
    default: 0,
  },
  correctAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  asked: {
    type: Number,
    default: 0,
  },
});

const QuestionStats =
  models.QuestionStats || model("QuestionStats", QuestionStatsSchema);

export default QuestionStats;
