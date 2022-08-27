import 'reflect-metadata';
import '../index.scss';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Toaster } from '../components/Toast/Toast';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <Toaster>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </Toaster>
);

export default MyApp;
