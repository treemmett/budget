import React, { FC } from 'react';
import Input from '../../components/Input/Input';
import { RouteComponentProps } from '@reach/router';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from './Login.scss';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;

interface LoginResponse {
  jwt: string;
}

const Login: FC<RouteComponentProps> = () => {
  const [login] = useMutation<
    { login: LoginResponse },
    { email: string; password: string }
  >(LOGIN);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement).value;

    const password = (e.currentTarget.elements.namedItem(
      'password'
    ) as HTMLInputElement).value;

    const response = await login({ variables: { email, password } });

    localStorage.setItem('token', response.data.login.jwt);
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.brand}>Rudget</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input name="email" label="Email" className={styles.input} required />
        <Input
          name="password"
          label="Password"
          type="password"
          className={styles.input}
          required
        />
        <div className={styles.buttons}>
          <a className={cx(styles.button, styles.secondary)} href="/register">
            Register
          </a>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
