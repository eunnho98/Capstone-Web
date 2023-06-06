import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// https://yokhuroute.store/oauth2/withdraw
// post /follow, 쿼리로 이메일, 헤더에 토큰

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const token = req.headers.authorization;

    if (!token) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }
    try {
      const result = await axios.delete(
        'https://yokhuroute.store/oauth2/withdraw',
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
