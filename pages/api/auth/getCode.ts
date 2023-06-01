// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log(req);
    const { code } = req.query;
    console.log('code:', code);
    res.json(code);
  }
}
