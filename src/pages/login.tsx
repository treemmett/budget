import cx from 'classnames';
import { NextPage } from 'next';
import Link from 'next/link';
import Input from '../components/Input/Input';
import styles from './login.module.scss';

interface Login {
  login: string;
}

const Login: NextPage = () => (
  <div className={styles.login}>
    <h1 className={styles.brand}>Budget</h1>
    {true ? (
      <form className={styles.form}>
        <Input className={styles.input} label="Email" name="email" type="email" required />
        <Input className={styles.input} label="Password" name="password" type="password" required />
        <div className={styles.buttons}>
          <Link href="/register">
            <a className={cx(styles.button, styles.secondary)} href="#.">
              Register
            </a>
          </Link>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    ) : (
      <form className={styles.form}>
        <div className={styles['split-input']}>
          <Input className={styles.input} label="First Name" name="firstName" required />
          <Input className={styles.input} label="Last Name" name="lastName" required />
        </div>
        <Input className={styles.input} label="Email" name="email" type="email" required />
        <Input className={styles.input} label="Password" name="password" type="password" required />
        <Input
          className={styles.input}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
        />
        <div className={styles.buttons}>
          <Link href="/login">
            <a className={cx(styles.button, styles.secondary)} href="#.">
              Back to Login
            </a>
          </Link>
          <button className={styles.button} type="submit">
            Register
          </button>
        </div>
      </form>
    )}
  </div>
);

export default Login;
