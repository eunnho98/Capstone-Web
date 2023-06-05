import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// https://yokhuroute.store/
// post /follow, 쿼리로 이메일, 헤더에 토큰

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, token } = req.body;
    console.log('email:', email);
    console.log('token', token);
    if (!email || !token) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }
    try {
      const result = await axios.post('https://yokhuroute.store/follow', null, {
        headers: {
          Authorization: token,
        },
        params: {
          email: email,
        },
      });
      console.log('result', result);
      return res.send(result);
    } catch (error) {
      console.log('error', error.response);
      return res.send(error.response);
    }
  }
}
