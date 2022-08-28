import Btn from '../components/Btn';
import TextField from '../components/TextField';
import styles from './Login.module.scss';

const Login: React.FC = () => (
  <div className={styles.login}>
    <form>
      <TextField label="Email" name="email" />
      <TextField label="Password" name="password" type="password" />
      <Btn label="Login" type="submit" />
    </form>
    <div className={styles.footer}>
      <a href="/login/forgot">Forgot Password?</a>
      <a href="/register">Create Account</a>
    </div>
  </div>
);

export default Login;
