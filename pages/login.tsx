import { userState } from '@/atom/atom';
import { Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

function login() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const code = router.query.code as string;
  const getResult = async (code: string) => {
    const result = await axios.get(
      'https://yokhuroute.store/login/oauth2/code/google',
      {
        params: { code: code },
      },
    );
    return result;
  };
  if (code) {
    const result: any = getResult(code);
    const userData = {
      nickname: result.data.nickname,
      username: result.data.username,
      email: result.data.email,
      accessToken: result.headers.authorization,
    };
    console.log(userData);
  }

  return <Box></Box>;
}

export default login;
