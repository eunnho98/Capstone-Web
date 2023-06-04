import { EmailIcon, EyeCloseIcon, EyeIcon, KeyIcon } from '@/Icons/icons';
import { userState } from '@/atom/atom';
import CommonInput from '@/components/CommonInput';
import { logoutAPI, withdrawAPI } from '@/lib/api/auth';
import { addFriendAPI, getFriendAPI } from '@/lib/api/friend';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

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
  const [hide, setHide] = useState<boolean>(true);
  const [checkHide, setCheckHide] = useState<boolean>(true);
  const [user, setUser] = useRecoilState(userState);
  const { control, getValues } = useForm<IForm>();
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonProps = {
    display: 'block',
    w: '140px',
    h: '40px',
    fontSize: '20px',
    justifyContent: 'center',
    margin: '0 auto',
  };
  const [tmp, setTmp] = useState<any[]>([]);

  const logout = async (token: string) => {
    const res = await logoutAPI(token);
    return res;
  };

  const withdraw = async (token: string) => {
    const res = await withdrawAPI(token);
    return res;
  };

  const getFriend = async (token: string) => {
    const res = await getFriendAPI(token);
    return res;
  };

  useEffect(() => {
    getFriend('Bearer ' + user.accessToken)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const onLogout = () => {
    if (typeof window === undefined) {
      return;
    } else {
      logout('Bearer ' + user.accessToken)
        .then((res) => {
          console.log(res);
          const userData = {
            nickname: '',
            username: '',
            email: '',
            accessToken: '',
          };
          window.localStorage.clear();
          setUser(userData);
          router.push('/auth');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onWithdraw = () => {
    if (typeof window === undefined) {
      return;
    } else {
      withdraw('Bearer ' + user.accessToken)
        .then((res) => {
          console.log(res);
          const userData = {
            nickname: '',
            username: '',
            email: '',
            accessToken: '',
          };
          window.localStorage.clear();
          setUser(userData);
          router.push('/auth');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickFriend = () => {
    const friend = getValues('friend');
    addFriendAPI(friend, 'Bearer ' + user.accessToken)
      .then((res) => {
        console.log(res);
        toast({
          title: '친구 요청 완료!',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast({
          title: '등록되지 않은 사용자입니다.!',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const onClickInfo = () => {
    toast({
      title: '구글로 로그인하였습니다. \n정보 수정이 불가능합니다.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box p="36px 12px">
      <Tabs isFitted variant="soft-rounded">
        <TabList w="100%" h="50px" gap={2}>
          <Tab {...customTabProps}>내정보</Tab>
          <Tab {...customTabProps}>정보수정</Tab>
          <Tab {...customTabProps}>친구찾기</Tab>
        </TabList>
        <Heading textAlign="center" mt="12px">
          {user.nickname}
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
                <Heading size="lg">{user.email}</Heading>
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
            <HStack mt="24px">
              <Button {...buttonProps} colorScheme="purple" onClick={onLogout}>
                로그아웃
              </Button>
              <Button {...buttonProps} colorScheme="orange" onClick={onOpen}>
                회원탈퇴
              </Button>
              {/* Modal */}
              <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>정말 탈퇴할까요?</ModalHeader>
                  <ModalCloseButton />
                  <ModalFooter gap={2}>
                    <Button onClick={onWithdraw}>네</Button>
                    <Button onClick={onClose} colorScheme="orange">
                      아니요
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </HStack>
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
              {...buttonProps}
              colorScheme="purple"
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
