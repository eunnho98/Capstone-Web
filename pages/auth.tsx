import { EmailIcon, KeyIcon, EyeIcon, EyeCloseIcon } from '@/Icons/icons';
import CommonInput from '@/components/CommonInput';
import ShaderText from '@/components/ShaderText';
import {
  Box,
  Button,
  Heading,
  Input,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
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
  const { handleSubmit, control, watch, setValue } = useForm<IForm>();
  const [valid, setValid] = useState(false);
  const onClick = (e) => {
    setAuthMode(e.target.value);
    setValue('email', '');
    setValue('password', '');
    setValue('checkPassword', '');
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
      <Button w="100%" colorScheme="purple" mt="36px" isDisabled={!valid}>
        {authMode === 'login' ? '로그인' : '회원가입'}
      </Button>
      <Button w="100%" colorScheme="messenger" mt="18px">
        구글로 시작하기
      </Button>
    </Box>
  );
}

export default login;
