import { EmailIcon, EyeCloseIcon, EyeIcon, KeyIcon } from '@/Icons/icons';
import CommonInput from '@/components/CommonInput';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const tmpFriend = [
  {
    email: 'taemin@khu.ac.kr',
    status: 'off',
  },
  {
    email: 'eunnho@khu.ac.kr',
    status: 'on',
  },
  {
    email: 'khu@khu.ac.kr',
    status: 'on',
  },
];

interface IForm {
  email: string;
  password: string;
  checkPassword: string;
  friend: string;
}

const customTabProps = {
  bgColor: 'gray.100',
  _selected: { color: 'white', bg: 'gray.600' },
  fontSize: '18px',
  fontWeight: 'bold',
};

function userInfo() {
  const { handleSubmit, control, watch } = useForm<IForm>();
  const toast = useToast();

  const onLogout = async () => {};

  const onClickFriend = () => {
    toast({
      title: '친구 요청 완료!',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const onClickInfo = () => {
    toast({
      title: '정보 수정 완료!',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };
  const [hide, setHide] = useState<boolean>(true);
  const [checkHide, setCheckHide] = useState<boolean>(true);
  return (
    <Box p="36px 12px">
      <Tabs isFitted variant="soft-rounded">
        <TabList w="100%" h="50px" gap={2}>
          <Tab {...customTabProps}>내정보</Tab>
          <Tab {...customTabProps}>정보수정</Tab>
          <Tab {...customTabProps}>친구찾기</Tab>
        </TabList>
        <Heading textAlign="center" mt="12px">
          김은호
        </Heading>
        <Avatar
          bg="gray.400"
          size="2xl"
          position="relative"
          left="50%"
          top="10px"
          transform="translate(-50%, 0)"
        />
        <TabPanels mt="10px">
          {/* 내정보 */}
          <TabPanel>
            <Card
              align="center"
              w="100%"
              margin="0 auto"
              mt="24px"
              boxShadow="0 2px 16px rgba(0, 0, 0, 0.12)"
            >
              <CardHeader>
                <Heading size="lg">Hello@khu.ac.kr</Heading>
                <Text textAlign="center" mt="6px" fontSize="18px">
                  친구목록
                </Text>
              </CardHeader>
              <Box w="90%" h="4px" bgColor="blue.400" borderRadius="12px" />
              <CardBody>
                <VStack justifyContent="space-between">
                  {tmpFriend.map((item) => (
                    <Box key={item.email} w="100%">
                      <HStack spacing={8}>
                        <Avatar size="sm">
                          <AvatarBadge
                            boxSize="1em"
                            bg={item.status === 'on' ? 'green.500' : 'tomato'}
                          />
                        </Avatar>
                        <Text fontSize="20px">{item.email}</Text>
                      </HStack>
                      <Box w="100%" h="2px" bgColor="gray.200" mt="2px" />
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
            <Button
              display="block"
              w="140px"
              h="40px"
              fontSize="20px"
              justifyContent="center"
              colorScheme="purple"
              margin="0 auto"
              mt="24px"
              onClick={onClickInfo}
            >
              로그아웃
            </Button>
          </TabPanel>
          {/* 정보수정 */}
          <TabPanel>
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
            </VStack>
            <Button
              display="block"
              w="140px"
              h="40px"
              fontSize="20px"
              justifyContent="center"
              colorScheme="purple"
              margin="0 auto"
              mt="48px"
              onClick={onClickInfo}
            >
              수정하기
            </Button>
          </TabPanel>
          {/* 친구찾기 */}
          <TabPanel>
            <VStack mt="86px" gap={6}>
              <CommonInput
                control={control}
                name="friend"
                type="string"
                icons={<EmailIcon />}
                placeholder="이메일"
              />
              <Button
                colorScheme="purple"
                mt="32px"
                onClick={onClickFriend}
                w="140px"
                h="40px"
                fontSize="20px"
              >
                친구요청
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default userInfo;
