import { Schema, model, models } from 'mongoose';

const TestSchema = new Schema({
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
        ref: 'User',
        required: true,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question',
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
            ref: 'User',
        },
    ],
});

const Test = models.Test || model('Test', TestSchema);

export default Test;
