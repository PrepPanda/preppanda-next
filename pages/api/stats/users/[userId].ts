// Purpose: Get the stats of the test which is given by user

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import UserTestStats from '@/models/user-test-stats';
import User from '@/models/user';
import QuestionStats from '@/models/question-stats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const userId = req.query.userId as string;
    const testId = req.body.testId as string;

    try {
        console.log("userId:", userId);
        console.log("testId:", testId);

        switch (method) {
            case 'GET': {
                const { userId, testId } = req.query;
                if (!userId && !testId) {
                    console.log("here");
                    res.status(400).json({ success: false, error: 'User ID and test ID are required' });
                    return;
                }
                    await connectDB();
                    const stats = await UserTestStats.findOne({ userId, testId }).populate('questions');
                    if (!stats) {
                        res.status(404).json({ success: false, error: 'No test stats found for this user and test' });
                        return;
                    }
                    res.status(200).json({ success: true, data: stats });

                break;
            }

            case 'POST': {
                if (!userId && !testId) {
                    res.status(400).json({ success: false, error: 'User ID and test ID are required' });
                    return;
                }
                const { score, time, questionsStats } = req.body;
                await connectDB();

                // Find or create user stats
                let userStats = await UserTestStats.findOne({ userId, testId });
                if (!userStats) {
                    userStats = await UserTestStats.create({ userId, testId });
                }

                // Update user stats
                const updatedUserStats = {
                    attempts: userStats.attempts + 1,
                    avgScore: (userStats.avgScore * userStats.attempts + score) / (userStats.attempts + 1),
                    avgTime: (userStats.avgTime * userStats.attempts + time) / (userStats.attempts + 1)
                };

                // Update or create question stats
                for (const questionStat of questionsStats) {
                    const { question, time, score, attempt, right } = questionStat;
                    let questionStats = await QuestionStats.findOne({ question: question, testOrUser: false });
                    if (!questionStats) {
                        questionStats = await QuestionStats.create({
                            question: question,
                            avgTime: time,
                            avgScore: score,
                            attempts: attempt ? 1 : 0,
                            correctAttempts: right ? 1 : 0,
                            asked: 1,
                            testOrUser: false
                        });
                    } else {
                        questionStats.avgTime = (questionStats.avgTime * questionStats.asked + time) / (questionStats.asked + 1);
                        questionStats.avgScore = (questionStats.avgScore * questionStats.asked + score) / (questionStats.asked + 1);
                        questionStats.attempts += attempt ? 1 : 0;
                        questionStats.correctAttempts += right ? 1 : 0;
                        questionStats.asked++;
                    }
                    await questionStats.save();

                    // Check if the question ID already exists in the array before pushing
                    if (!userStats.questions.includes(questionStats._id)) {
                        userStats.questions.push(questionStats._id);
                    }
                }

                userStats.set(updatedUserStats);
                await userStats.save();
                res.status(200).json({ success: true, data: userStats });

                break;
            }

            default:
                res.status(405).json({ success: false, error: 'Unsupported HTTP method' });
        }
    } catch (error) {
        console.error('Error in [userId].ts:');
console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


