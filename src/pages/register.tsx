import { NextPage } from 'next';
import Link from 'next/link';
import Btn from '../components/Btn';
import TextField, { SplitInputs } from '../components/TextField';
import styles from './login.module.scss';

const Register: NextPage = () => (
  <div className={styles.login}>
    <form>
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
      <Link href="/login">Login</Link>
    </div>
  </div>
);

export default Register;
