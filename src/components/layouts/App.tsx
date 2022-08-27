import CreditCard from '../icons/CreditCard';
import { Link } from '@reach/router';
import Money from '../icons/Money';
import React from 'react';
import Wallet from '../icons/Wallet';
import styles from './App.module.scss';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => (
  <div className={styles.app}>
    <div className={styles.content}>{children}</div>

    <nav className={styles.nav}>
      <Link
        getProps={({ isCurrent }) => ({
          className: isCurrent ? styles['active-link'] : undefined
        })}
        to="/"
      >
        <Wallet />
        <div className={styles.title}>Budget</div>
      </Link>
      <Link
        getProps={({ isCurrent }) => ({
          className: isCurrent ? styles['active-link'] : undefined
        })}
        to="/transactions"
      >
        <CreditCard />
        <div className={styles.title}>Transactions</div>
      </Link>
      <Link
        getProps={({ isCurrent }) => ({
          className: isCurrent ? styles['active-link'] : undefined
        })}
        to="/income"
      >
        <Money />
        <div className={styles.title}>Income</div>
      </Link>
    </nav>
  </div>
);

export default App;
