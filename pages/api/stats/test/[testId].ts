// Purpose: Find test-stats and update it or create if not found

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import TestStats from '@/models/test-stats';
import QuestionStats from '@/models/question-stats';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const testId = req.query.testId as string;

    switch (method) {
        case 'GET': {
            try {
                await connectDB();
                const testStats = await TestStats.findOne({ testId: testId });
                if (!testStats) {
                    return res.status(404).json({ error: 'Test Stats not found' });
                }
                res.status(200).json({ testStats });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }

        case 'POST': {
            try {
                const { score, time, questionsStats } = req.body;
                await connectDB();

                // Find or create test stats
                let testStats = await TestStats.findOne({ testId: testId });
                if (!testStats) {
                    testStats = await TestStats.create({ testId: testId });
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
                    let questionStats = await QuestionStats.findOne({ question: question, testOrUser: true });
                    if (!questionStats) {
                        questionStats = await QuestionStats.create({
                            question: question,
                            avgTime: time,
                            avgScore: score,
                            attempts: attempt ? 1 : 0,
                            correctAttempts: right ? 1 : 0,
                            asked: 1,
                            testOrUser: true
                        });
                    } else {
                        questionStats.avgTime = (questionStats.avgTime * questionStats.asked + time) / (questionStats.asked + 1);
                        questionStats.avgScore = (questionStats.avgScore * questionStats.asked + score) / (questionStats.asked + 1);
                        questionStats.attempts += attempt ? 1 : 0;
                        questionStats.correctAttempts += right ? 1 : 0;
                        questionStats.asked += 1;
                    }
                    await questionStats.save();

                    // Check if the question ID already exists in the array before pushing
                    if (!testStats.questions.includes(questionStats._id)) {
                        testStats.questions.push(questionStats._id);
                    }
                }

                testStats.set(updatedTestStats);
                await testStats.save();

                res.status(200).json({ testStats });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }


        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}


