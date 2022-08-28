import 'reflect-metadata';
import '../index.scss';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoreProvider } from '../components/Store';
import { Toaster } from '../components/Toast/Toast';
import App from '../components/layouts/App';

const queryClient = new QueryClient();

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <StoreProvider>
    <QueryClientProvider client={queryClient}>
      <App>
        <Toaster>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </Toaster>
      </App>
    </QueryClientProvider>
  </StoreProvider>
);

export default MyApp;
