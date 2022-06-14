import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Head>
          <title>Welcome to conjug8-client!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
