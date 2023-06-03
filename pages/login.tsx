import { userState } from '@/atom/atom';
import { Button, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function login() {
  // let userData: any;
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const [code, setCode] = useState('');
  setCode(router.query.code as string);
  console.log(router);
  console.log(code);
  const getResult = async (code: string) => {
    const result = await axios.get('/login/oauth2/code/google', {
      params: { code: code },
    });
    return result;
  };
  if (code !== undefined) {
    try {
      const result: any = getResult(code);
      console.log('result', result);
      // userData = {
      //   nickname: result.data.nickname,
      //   username: result.data.username,
      //   email: result.data.email,
      //   accessToken: result.headers.authorization,
      // };
      // console.log(userData);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  useEffect(() => {}, [code]);

  return <Box></Box>;
}

export default login;
