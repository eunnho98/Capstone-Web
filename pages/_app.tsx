import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
