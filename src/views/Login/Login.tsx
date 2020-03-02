import { Link, RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import Input from '../../components/Input/Input';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from './Login.scss';
import { useMutation } from '@apollo/react-hooks';
import { useToasts } from '../../components/Toast/Toast';

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
  const { addToast } = useToasts();

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
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement).value;

    const password = (e.currentTarget.elements.namedItem(
      'password'
    ) as HTMLInputElement).value;

    const response = await login({ variables: { email, password } });

    localStorage.setItem('token', response.data.login.jwt);
    navigate('/');
  }

  async function onRegister(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    const [firstName, lastName, email, password, confirmPassword] = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword'
    ].map(
      name =>
        (e.currentTarget.elements.namedItem(name) as HTMLInputElement).value
    );

    if (password !== confirmPassword) {
      // TODO: add better confirmation handling
      throw new Error('Passwords do not match');
    }

    const registerResponse = await createUser({
      variables: { data: { email, firstName, lastName, password } }
    });

    const loginResponse = await login({
      variables: { email: registerResponse.data.createUser.email, password }
    });

    localStorage.setItem('token', loginResponse.data.login.jwt);
    navigate('/');
  }

  return (
    <div className={styles.login}>
      <button
        type="button"
        onClick={() => {
          addToast({
            // eslint-disable-next-line no-alert
            title: window.prompt('Toast title'),
            // eslint-disable-next-line no-alert
            message: window.prompt('Toast message'),
            // eslint-disable-next-line no-alert
            status: window.confirm('Error?') ? 'error' : 'info'
          });
        }}
      >
        Toast
      </button>
      <h1 className={styles.brand}>Rudget</h1>
      {path === '/login' ? (
        <form className={styles.form} onSubmit={onLogin}>
          <Input
            name="email"
            label="Email"
            type="email"
            className={styles.input}
            required
            autoFocus
          />
          <Input
            name="password"
            label="Password"
            type="password"
            className={styles.input}
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
              name="firstName"
              label="First Name"
              className={styles.input}
              required
              autoFocus
            />
            <Input
              name="lastName"
              label="Last Name"
              className={styles.input}
              required
            />
          </div>
          <Input
            name="email"
            label="Email"
            type="email"
            className={styles.input}
            required
          />
          <Input
            name="password"
            label="Password"
            type="password"
            className={styles.input}
            required
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            className={styles.input}
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
