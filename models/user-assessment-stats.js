import { Schema, model, models } from "mongoose";

const UserAssessmentStatsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  assessmentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Assessment",
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


const UserAssessmentStats = models.UserAssessmentStats || model("UserAssessmentStats", UserAssessmentStatsSchema);

export default UserAssessmentStats;

