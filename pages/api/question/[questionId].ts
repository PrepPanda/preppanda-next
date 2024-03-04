import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';

import Question from '@/models/question';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    switch (method) {
        case 'GET':
            await handleGet(req, res);
            break;
       case 'PUT':
            await handlePut(req, res);
            break;
        case 'DELETE':
            await handleDelete(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const questionId = req.query.questionId;
        await connectDB();
        const question = await Question.findById(questionId);
        res.status(200).json(question);
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const questionId = req.query.questionId;
        const data = req.body;
        await connectDB();
        const question = await Question.findById(questionId);
        if(data.question){
            question.question = data.question;
        }
        if(data.answer){
            question.correctAnswer = data.answer;
        }
        if(data.options){
            question.options = data.options;
        }
        if(data.image){
            question.image = data.image;
        }
        if(data.type){
            question.type = data.type;
        }
        if(data.marks){
            question.marks = data.marks;
        }
        await question.save();
        res.status(200).json({ text: 'Question updated successfully' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const questionId = req.query.questionId;
        await connectDB();
        await Question.findByIdAndDelete(questionId);
        res.status(200).json({ text: 'Question deleted successfully' });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
}


