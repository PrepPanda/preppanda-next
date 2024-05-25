import { Schema, model, models } from 'mongoose';

const AssessmentStatsSchema = new Schema({
  assessmentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Assessment'
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

const AssessmentStats = models.AssessmentStats || model('AssessmentStats', AssessmentStatsSchema)

export default AssessmentStats;

