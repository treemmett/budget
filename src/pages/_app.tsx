import 'reflect-metadata';
import '../index.scss';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { StoreProvider } from '../components/Store';
import { Toaster } from '../components/Toast/Toast';
import App from '../components/layouts/App';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <StoreProvider>
    <App>
      <Toaster>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Toaster>
    </App>
  </StoreProvider>
);

export default MyApp;
