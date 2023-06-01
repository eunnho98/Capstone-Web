// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log(req);
    const { code } = req.query;
    console.log('code:', code);
    try {
      const result = await axios.get(
        'https://yokhuroute.store/login/oauth2/code/google',
        {
          params: { code: code },
        },
      );
      console.log('result', result);
      console.log('header', result.headers);
      res.statusCode = 200;
      const ssibal = JSON.stringify(result);
      console.log(ssibal);
      res.send(ssibal);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.send(error);
    }
  }
}
