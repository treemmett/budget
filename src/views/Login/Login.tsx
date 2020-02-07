import React, { FC } from 'react';
import gql from 'graphql-tag';
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

const Login: FC = () => {
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
    <form onSubmit={onSubmit}>
      <input name="email" placeholder="email" />
      <input name="password" placeholder="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
