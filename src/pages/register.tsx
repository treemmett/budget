import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import Btn from '../components/Btn';
import TextField, { SplitInputs } from '../components/TextField';
import { register } from '../redux/actions/authentication';
import styles from './Login.module.scss';

const Register: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();

  async function submitForm(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    const { email, firstName, lastName, password, confirmPassword } = form.elements as unknown as {
      [input: string]: HTMLInputElement;
    };

    if (password.value !== confirmPassword.value) {
      // eslint-disable-next-line no-alert
      alert('Passwords do not match.');
    }

    dispatch(register(email.value, password.value, firstName.value, lastName.value));
  }

  return (
    <div className={styles.login}>
      <form onSubmit={submitForm}>
        <SplitInputs>
          <TextField label="First Name" name="firstName" required />
          <TextField label="Last Name" name="lastName" required />
        </SplitInputs>
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Password" name="password" type="password" required />
        <TextField label="Confirm Password" name="confirmPassword" type="password" required />
        <Btn label="Create Account" type="submit" />
      </form>
      <div className={styles.footer}>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
