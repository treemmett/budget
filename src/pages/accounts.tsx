import { Account as AccountType } from 'budget';
import cx from 'classnames';
import { NextPage } from 'next';
import React, { FC, useState } from 'react';
import AccountIcon from '../assets/icons/account.svg';
import Edit from '../assets/icons/edit.svg';
import Fab from '../components/Fab/Fab';
import submitInput from '../utils/submitInput';
import styles from './accounts.module.scss';

interface AccountProps {
  id: string;
  name: string;
}

const Account: FC<AccountProps> = ({ id, name }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={cx(styles.card, { [styles.editing]: isEditing })}>
      {isEditing ? (
        <input
          className={styles.name}
          defaultValue={name}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) =>
            submitInput({
              async enter() {
                console.log('changing', id, e.currentTarget.value);
                setIsEditing(false);
              },
              escape() {
                setIsEditing(false);
              },
              event: e,
            })
          }
        />
      ) : (
        <div className={styles.name}>{name}</div>
      )}
      <button className={styles.edit} onClick={() => setIsEditing(true)} type="button">
        <Edit aria-label="Edit account" />
      </button>
      <AccountIcon className={styles.icon} />
      <div className={styles.type}>Checking</div>
    </div>
  );
};

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
