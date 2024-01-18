import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        console.log(req.body);
        res.status(200).json({ text: 'Hello' });
    }

    else {
        res.status(200).json({ text: 'Bye' });
        console.log("helloa");

    }
}
