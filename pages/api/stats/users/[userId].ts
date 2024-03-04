// Purpose: Get the stats of the test which is given by user

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import UserTestStats from '@/models/user-test-stats';
import User from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const userId = req.query.userId as string;
    const testId = req.body.testId as string;

    try {
        await connectDB();

        console.log("userId:", userId);
        console.log("testId:", testId);

        switch (method) {
            case 'GET':{
                if (!userId && !testId) {
                    console.log('userId:', userId);
                    console.log('testId:', testId);
                    const stats = await UserTestStats.findOne({ userId, testId }).populate('questions');
                    if (!stats) {
                        res.status(404).json({ success: false, error: 'No test stats found for this user and test' });
                        return;
                    }
                    res.status(200).json({ success: true, data: stats });
                }
                break;
            }

            case 'POST': {
                if (!userId && !testId) {
                    const { score, time, questionsStats } = req.body;
                    connectDB();

                    // Find or create test stats
                    let testStats = await UserTestStats.findOne({ testId: testId, userId: userId});
                    if (!testStats) {
                        testStats = await UserTestStats.create({ testId: testId, userId: userId});
                    }

                    // Update test stats
                    const updatedTestStats = {
                        attempts: testStats.attempts + 1,
                        avgScore: (testStats.avgScore * testStats.attempts + score) / (testStats.attempts + 1),
                        avgTime: (testStats.avgTime * testStats.attempts + time) / (testStats.attempts + 1)
                    };

                    // Update or create question stats
                    for (const questionStat of questionsStats) {
                        const { question, time, score, attempt, right } = questionStat;
                        let questionStats = await UserTestStats.findOne({ question: question, testOrUser: false, userId: userId});
                        if (!questionStats) {
                            questionStats = await UserTestStats.create({
                                question: question,
                                avgTime: time,
                                avgScore: score,
                                attempts: attempt ? 1 : 0,
                                correctAttempts: right ? 1 : 0,
                                testOrUser: false,
                            });
                        } else {
                            questionStats.avgTime = (questionStats.avgTime * questionStats.asked + time) / (questionStats.asked + 1);
                            questionStats.avgScore = (questionStats.avgScore * questionStats.asked + score) / (questionStats.asked + 1);
                            questionStats.attempts += attempt ? 1 : 0;
                            questionStats.correctAttempts += right ? 1 : 0;
                        }
                        await questionStats.save();
                    }

                    // Update user test stats
                    const user = await User.findById(userId);
                    if (!user) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    user.tests.push(testId);
                    await user.save();

                    res.status(200).json({ success: true, data: updatedTestStats });
                }
                break;
            }

            default:
                res.status(405).json({ success: false, error: 'Unsupported HTTP method' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


