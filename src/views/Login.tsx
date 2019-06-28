import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import TextField from '../components/TextField';
import styles from './Login.module.scss';
import Btn from '../components/Btn';
import axios from '../utils/axios';

const Login: React.FC<RouteComponentProps> = () => {
  async function login(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const { email, password } = (form.elements as unknown) as {
      [input: string]: HTMLInputElement;
    };

    try {
      const { data } = await axios({
        method: 'POST',
        url: '/auth',
        data: {
          email: email.value.toString(),
          password: password.value.trim()
        }
      });

      const session = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: new Date(Date.now() + data.expiresIn * 1000)
      };

      localStorage.setItem('session', JSON.stringify(session));

      alert('Login succssful');
    } catch (er) {
      console.error(er);
      alert('Login failed.');
    }
  }

  return (
    <div className={styles.login}>
      <form onSubmit={login}>
        <TextField defaultValue="foo" label="Email" name="email" />
        <TextField label="Password" name="password" type="password" />
        <Btn label="Login" type="submit" />
      </form>
      <div className={styles.footer}>
        <Link to="/login/forgot">Forgot Password?</Link>
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
