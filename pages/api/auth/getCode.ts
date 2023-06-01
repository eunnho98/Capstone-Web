// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log(req);
    const { code } = req.query;
    console.log('code:', code);
    try {
      const result = axios.get(
        'https://yokhuroute.store:8080/login/oauth2/code/google',
        {
          params: { code: code },
        },
      );
      console.log('result', result);
      res.statusCode = 200;
      res.json(result);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
  }
}
