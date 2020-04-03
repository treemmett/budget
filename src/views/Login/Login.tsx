import { Link, RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import Input from '../../components/Input/Input';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from './Login.scss';
import useGraphQLError from '../../utils/useGraphQLError';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      email
    }
  }
`;

interface LoginResponse {
  jwt: string;
}

const Login: FC<RouteComponentProps> = ({ navigate, path }) => {
  const gqlErrorToToast = useGraphQLError();
  const [login] = useMutation<
    { login: LoginResponse },
    { email: string; password: string }
  >(LOGIN);

  const [createUser] = useMutation<
    {
      createUser: { email: string };
    },
    {
      data: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
      };
    }
  >(CREATE_USER);

  async function onLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();
      const email = (e.currentTarget.elements.namedItem(
        'email'
      ) as HTMLInputElement).value;

      const password = (e.currentTarget.elements.namedItem(
        'password'
      ) as HTMLInputElement).value;

      const response = await login({
        variables: { email, password },
      });

      localStorage.setItem('token', response.data.login.jwt);
      await navigate('/');
    } catch (err) {
      gqlErrorToToast(err, 'Login failed');
    }
  }

  async function onRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    try {
      e.preventDefault();
      const [firstName, lastName, email, password, confirmPassword] = [
        'firstName',
        'lastName',
        'email',
        'password',
        'confirmPassword',
      ].map(
        name =>
          (e.currentTarget.elements.namedItem(name) as HTMLInputElement).value
      );

      if (password !== confirmPassword) {
        // TODO: add better confirmation handling
        throw new Error('Passwords do not match.');
      }

      const registerResponse = await createUser({
        variables: { data: { email, firstName, lastName, password } },
      });

      if (!registerResponse) return;

      const loginResponse = await login({
        variables: { email: registerResponse.data.createUser.email, password },
      });

      localStorage.setItem('token', loginResponse.data.login.jwt);
      await navigate('/');
    } catch (err) {
      gqlErrorToToast(err, 'User creation failed');
    }
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.brand}>Rudget</h1>
      {path === '/login' ? (
        <form className={styles.form} onSubmit={onLogin}>
          <Input
            className={styles.input}
            label="Email"
            name="email"
            type="email"
            autoFocus
            required
          />
          <Input
            className={styles.input}
            label="Password"
            name="password"
            type="password"
            required
          />
          <div className={styles.buttons}>
            <Link
              className={cx(styles.button, styles.secondary)}
              to="/register"
            >
              Register
            </Link>
            <button className={styles.button} type="submit">
              Login
            </button>
          </div>
        </form>
      ) : (
        <form className={styles.form} onSubmit={onRegister}>
          <div className={styles.splitInput}>
            <Input
              className={styles.input}
              label="First Name"
              name="firstName"
              autoFocus
              required
            />
            <Input
              className={styles.input}
              label="Last Name"
              name="lastName"
              required
            />
          </div>
          <Input
            className={styles.input}
            label="Email"
            name="email"
            type="email"
            required
          />
          <Input
            className={styles.input}
            label="Password"
            name="password"
            type="password"
            required
          />
          <Input
            className={styles.input}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
          />
          <div className={styles.buttons}>
            <Link className={cx(styles.button, styles.secondary)} to="/login">
              Back to Login
            </Link>
            <button className={styles.button} type="submit">
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
