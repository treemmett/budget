import { Account as AccountType } from 'budget';
import cx from 'classnames';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Fab from '../../components/Fab/Fab';
import styles from './Accounts.scss';
import Account from './components/Account';

const Accounts: NextPage = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const accounts: AccountType[] = [
    {
      id: 'a',
      name: 'Checking',
    },
  ];

  return (
    <div className={styles.view}>
      <div className={styles.section}>
        <div className={styles.title}>Bank Accounts</div>
        <div className={styles.grid}>
          {accounts.map((account) => (
            <div className={styles.cell} key={account.id}>
              <Account id={account.id} name={account.name} />
            </div>
          ))}
          {isCreatingAccount && (
            <div className={cx(styles.card, styles.input)}>
              <input onBlur={() => setIsCreatingAccount(false)} placeholder="Account Name" />
            </div>
          )}
        </div>
      </div>
      <Fab onClick={() => setIsCreatingAccount(true)}>+</Fab>
    </div>
  );
};

export default Accounts;
