import React from 'react';
import { RouteComponentProps } from '@reach/router';
import TextField from '../components/TextField';
import styles from './Login.module.scss';

const Login: React.FC<RouteComponentProps> = () => {
  return (
    <div className={styles.login}>
      <form>
        <TextField defaultValue="foo" label="Email" />
        <TextField label="Password" type="password" />
      </form>
    </div>
  );
};

export default Login;
