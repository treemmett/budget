import cx from 'classnames';
import React, { FC, useState } from 'react';
import AccountIcon from '../../../assets/icons/account.svg';
import Edit from '../../../assets/icons/edit.svg';
import submitInput from '../../../utils/submitInput';
import styles from '../Accounts.scss';

interface AccountProps {
  id: string;
  name: string;
}

const Account: FC<AccountProps> = ({ id, name }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={cx(styles.card, { [styles.isEditing]: isEditing })}>
      {isEditing ? (
        <input
          className={styles.accountName}
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
        <div className={styles.accountName}>{name}</div>
      )}
      <button className={styles.edit} onClick={() => setIsEditing(true)} type="button">
        <Edit aria-label="Edit account" />
      </button>
      <AccountIcon className={styles.typeIcon} />
      <div className={styles.accountType}>Checking</div>
    </div>
  );
};

export default Account;
