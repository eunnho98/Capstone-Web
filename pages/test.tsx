import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';

function test() {
  const router = useRouter();
  const onTest = async () => {
    const googleLoginURL =
      'https://accounts.google.com/o/oauth2/v2/auth?scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scope=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://capstone-web-zeta.vercel.app/api/auth/getCode&client_id=759416534029-0idv1eac509hpu7h66na8bn4pug1k9ou.apps.googleusercontent.com';
    router.push(googleLoginURL);
  };
  return <Button onClick={onTest}>test</Button>;
}

export default test;
