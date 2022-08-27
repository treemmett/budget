import React from 'react';
import { ActiveLink } from '../ActiveLink';
import CreditCard from '../icons/CreditCard';
import Money from '../icons/Money';
import Wallet from '../icons/Wallet';
import styles from './App.module.scss';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }: AppProps) => (
  <div className={styles.app}>
    <div className={styles.content}>{children}</div>

    <nav className={styles.nav}>
      <ActiveLink activeClassName={styles['active-link']} href="/">
        <Wallet />
        <div className={styles.title}>Budget</div>
      </ActiveLink>
      <ActiveLink activeClassName={styles['active-link']} href="/transactions">
        <CreditCard />
        <div className={styles.title}>Transactions</div>
      </ActiveLink>
      <ActiveLink activeClassName={styles['active-link']} href="/income">
        <Money />
        <div className={styles.title}>Income</div>
      </ActiveLink>
    </nav>
  </div>
);

export default App;
