import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// https://yokhuroute.store/follow/following

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.headers.authorization;
    console.log('token', token);
    if (!token) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }
    try {
      const result = await axios.get(
        'https://yokhuroute.store/follow/following',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('result', result);
      return res.send(result);
    } catch (error) {
      console.log('error', error.response);
      return res.send(error.response);
    }
  }
}
