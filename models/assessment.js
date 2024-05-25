import { Schema, model, models } from "mongoose";
import { Group } from "./group";

const AssessmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  completeBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Assessment = models.Assessment || model("Assessment", AssessmentSchema);
export default Assessment;

