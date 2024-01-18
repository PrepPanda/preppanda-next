import { Schema, model, models } from "mongoose";

const TestSchema = new Schema({
  standard: {
    type: String,
  },
  subjects: [
    {
      type: String,
    },
  ],

  totalQuestions: {
    type: Number,
  },
});

const Test = models.Test || model("Test", TestSchema);

export default Test;
