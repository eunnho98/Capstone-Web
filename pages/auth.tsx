import { EmailIcon, KeyIcon, EyeIcon, EyeCloseIcon } from '@/Icons/icons';
import CommonInput from '@/components/CommonInput';
import ShaderText from '@/components/ShaderText';
import {
  Box,
  Button,
  Tab,
  TabList,
  Tabs,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface IForm extends FieldValues {
  email: string;
  password: string;
  checkPassword?: string;
}

const props = {
  fontSize: '4xl',
  fontWeight: 'bold',
  color: '#823fea',
  textShadow: '2px -1px 0 #e60bf0, -2px 1px 0 #34e6fe',
  mt: '43px',
  mb: '140px',
  height: '30px',
};

const text = 'Welcome To \n YoKHURoute!';

function login() {
  const [authMode, setAuthMode] = useState<string>('login');
  const [hide, setHide] = useState<boolean>(true);
  const [checkHide, setCheckHide] = useState<boolean>(true);
  const { control, watch, setValue } = useForm<IForm>();
  const [valid, setValid] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const onClick = (e) => {
    setAuthMode(e.target.value);
    setValue('email', '');
    setValue('password', '');
    setValue('checkPassword', '');
  };

  const onLogin = () => {
    toast({
      title: '현재 지원하지 않습니다. \n구글로 이용해주세요!',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (authMode === 'login') {
      if (
        watch('email') === '' ||
        watch('password') === '' ||
        watch('email') === undefined ||
        watch('password') === undefined
      ) {
        setValid(false);
      } else {
        setValid(true);
      }
    } else if (authMode === 'signup') {
      if (
        watch('email') === (undefined || '') ||
        watch('password') === (undefined || '') ||
        watch('checkPassword') === (undefined || '')
      ) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  });

  const onGoogleLogin = () => {
    const googleLoginURL =
      'https://accounts.google.com/o/oauth2/v2/auth?scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scope=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https://capstone-web-zeta.vercel.app/login&client_id=759416534029-0idv1eac509hpu7h66na8bn4pug1k9ou.apps.googleusercontent.com';
    router.push(googleLoginURL);
  };

  return (
    <Box p="36px 36px">
      <ShaderText {...props}>{text}</ShaderText>
      <Tabs isFitted variant="soft-rounded">
        <TabList onClick={onClick}>
          <Tab
            bgColor="gray.100"
            _selected={{ color: 'white', bg: 'gray.700' }}
            value="login"
          >
            로그인
          </Tab>
          <Tab
            bgColor="gray.100"
            _selected={{ color: 'white', bg: 'gray.700' }}
            value="signup"
          >
            회원가입
          </Tab>
        </TabList>
      </Tabs>
      <VStack gap={1} mt="32px">
        <CommonInput
          type="text"
          name="email"
          control={control}
          placeholder="이메일"
          icons={<EmailIcon />}
        />
        <CommonInput
          type={hide ? 'password' : 'text'}
          name="password"
          control={control}
          placeholder="비밀번호"
          icons={hide ? <KeyIcon /> : <EyeCloseIcon />}
          myChange={() => {
            setHide((prev) => !prev);
          }}
        />
        {authMode === 'signup' && (
          <CommonInput
            type={checkHide ? 'password' : 'text'}
            name="checkPassword"
            control={control}
            placeholder="비밀번호확인"
            icons={checkHide ? <EyeIcon /> : <EyeCloseIcon />}
            myChange={() => {
              setCheckHide((prev) => !prev);
            }}
          />
        )}
      </VStack>
      <Button
        w="100%"
        colorScheme="purple"
        mt="36px"
        isDisabled={!valid}
        letterSpacing="2px"
        onClick={onLogin}
      >
        {authMode === 'login' ? '로그인' : '회원가입'}
      </Button>
      <Button
        w="100%"
        colorScheme="messenger"
        mt="18px"
        onClick={onGoogleLogin}
        letterSpacing="1px"
      >
        구글로 시작하기
      </Button>
    </Box>
  );
}

export default login;
