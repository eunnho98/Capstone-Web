import { userState } from '@/atom/atom';
import { loginAPI } from '@/lib/api/auth';
import { Button, Heading, SlideFade, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function login() {
  const [shade, setShade] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const code = router.query.code as string;
  const getResult = async (code: string) => {
    const result = await loginAPI(code);
    return result;
  };

  useEffect(() => {
    if (code !== undefined) {
      try {
        getResult(code).then((res) => {
          const userData = {
            nickname: res.data.nickname,
            username: res.data.username,
            email: res.data.email,
            accessToken: res.headers.authorization,
          };
          setUser(userData);
          const userObj = JSON.stringify(userData);
          window.localStorage.setItem('user', userObj);
        });
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }, []);

  if (typeof window === undefined) {
    return <Heading p="200px 40px">Loading...</Heading>;
  } else {
    if (window.localStorage.getItem('user') === null) {
      <VStack p="200px 40px" gap={4}>
        <Heading>로그인이 필요합니다!</Heading>
        <Button
          w="240px"
          h="50px"
          fontSize="24px"
          letterSpacing="2px"
          lineHeight="32px"
          display="block"
          colorScheme="purple"
          onClick={() => {
            router.push('/auth');
          }}
        >
          로그인하러 가기
        </Button>
      </VStack>;
    } else {
      const nickname = JSON.parse(window.localStorage.getItem('user')).nickname;
      return (
        <VStack p="200px 40px" gap={4}>
          <SlideFade
            in={true}
            offsetY="20px"
            transition={{ enter: { duration: 0.5 } }}
            onAnimationComplete={() => {
              setShade(true);
            }}
          >
            <Heading textAlign="center" fontSize="42px">
              환영합니다
              <br />
              {nickname}님!
            </Heading>
          </SlideFade>
          <SlideFade
            in={shade}
            offsetY="20px"
            transition={{ enter: { duration: 0.5 } }}
          >
            <Button
              w="240px"
              h="50px"
              fontSize="24px"
              letterSpacing="2px"
              lineHeight="32px"
              display="block"
              colorScheme="purple"
              onClick={() => {
                router.push('/userInfo');
              }}
            >
              메인페이지로 이동
            </Button>
          </SlideFade>
        </VStack>
      );
    }
  }
}

export default login;
