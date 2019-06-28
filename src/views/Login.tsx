import { Link, RouteComponentProps } from '@reach/router';
import Btn from '../components/Btn';
import React from 'react';
import TextField from '../components/TextField';
import { login } from '../redux/actions/authentication';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';

const Login: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();

  async function submitForm(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const { email, password } = (form.elements as unknown) as {
      [input: string]: HTMLInputElement;
    };

    dispatch(login(email.value, password.value));
  }

  return (
    <div className={styles.login}>
      <form onSubmit={submitForm}>
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
