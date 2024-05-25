import { Schema, model, models } from 'mongoose';

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  options: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 1,
  },
  type: {
    type: String,
    default: 'multiple_choice',
    enum: ['multiple_choice', 'true_false', 'fill_in_the_blank', 'short_answer', 'long_answer'],
  },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;


