import 'reflect-metadata';
import '../index.scss';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { StoreProvider } from '../components/Store';
import { Toaster } from '../components/Toast/Toast';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <StoreProvider>
    <Toaster>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Toaster>
  </StoreProvider>
);

export default MyApp;
