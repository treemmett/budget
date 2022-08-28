import cx from 'classnames';
import { NextPage } from 'next';
import Input from '../../components/Input/Input';
import styles from './Login.module.scss';

interface Login {
  login: string;
}

const Login: NextPage = () => (
  <div className={styles.login}>
    <h1 className={styles.brand}>Budget</h1>
    {true ? (
      <form className={styles.form}>
        <Input
          className={styles.input}
          label="Email"
          name="email"
          type="email"
          autoFocus
          required
        />
        <Input className={styles.input} label="Password" name="password" type="password" required />
        <div className={styles.buttons}>
          <a className={cx(styles.button, styles.secondary)} href="/register">
            Register
          </a>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    ) : (
      <form className={styles.form}>
        <div className={styles.splitInput}>
          <Input className={styles.input} label="First Name" name="firstName" autoFocus required />
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
          <a className={cx(styles.button, styles.secondary)} href="/login">
            Back to Login
          </a>
          <button className={styles.button} type="submit">
            Register
          </button>
        </div>
      </form>
    )}
  </div>
);

export default Login;
