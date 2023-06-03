import { userState } from '@/atom/atom';
import { Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

function login() {
  let userData: any;
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const code = router.query.code as string;
  console.log(router);
  console.log(code);
  const getResult = async (code: string) => {
    const result = await axios.get('/login/oauth2/code/google', {
      params: { code: code },
    });
    return result;
  };
  if (code) {
    try {
      const result: any = getResult(code);
      userData = {
        nickname: result.data.nickname,
        username: result.data.username,
        email: result.data.email,
        accessToken: result.headers.authorization,
      };
      console.log(userData);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  return <Box>{userData && userData}</Box>;
}

export default login;
