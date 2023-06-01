// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log(req);
    const { code } = req.query;
    res.json(code);
  }
}
