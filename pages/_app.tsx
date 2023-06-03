import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    heading: `'Jua', sans-serif`,
    body: `'Jua', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
