import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        res.status(200).json({ text: 'Hello' });
        console.log("hello");
    }

    else {
        res.status(200).json({ text: 'Bye' });
        console.log("helloa");

    }
}
