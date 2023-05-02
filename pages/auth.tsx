import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';

function login() {
  return (
    <Box p="36px 36px">
      <Heading>YoKHURoute</Heading>
      <Text as="p" fontSize="xl" fontWeight="bold" m="86px 0">
        Welcome in YoKHURoute!
      </Text>
      <VStack gap={1}>
        <Input placeholder="ID" />
        <Input placeholder="Password" />
      </VStack>
      <Button colorScheme="blue" w="100%" mt="62px">
        Button
      </Button>
    </Box>
  );
}

export default login;
