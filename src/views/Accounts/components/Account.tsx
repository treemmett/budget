import React, { FC, useState } from 'react';
import AccountIcon from '../../../assets/icons/account.svg';
import { BudgetProps } from '../../Budget/Budget';
import Edit from '../../../assets/icons/edit.svg';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from '../Accounts.scss';
import submitInput from '../../../utils/submitInput';
import { useMutation } from '@apollo/react-hooks';
import { useParams } from '@reach/router';

interface AccountProps {
  id: string;
  name: string;
  budgetId?: string;
}

interface RenameAccount {
  renameAccount: {
    id: string;
    name: string;
  };
}

interface RenameAccountInput {
  id: string;
  name: string;
  budgetId: string;
}

const RENAME_ACCOUNT = gql`
  mutation RenameAccount($id: ID!, $name: String!, $budgetId: ID!) {
    renameAccount(id: $id, name: $name, budgetId: $budgetId) {
      id
      name
    }
  }
`;

const Account: FC<AccountProps> = ({ id, name }) => {
  const { budgetId } = useParams() as BudgetProps;
  const [isEditing, setIsEditing] = useState(false);
  const [renameAccount] = useMutation<RenameAccount, RenameAccountInput>(
    RENAME_ACCOUNT
  );

  return (
    <div className={cx(styles.card, { [styles.isEditing]: isEditing })}>
      {isEditing ? (
        <input
          className={styles.accountName}
          defaultValue={name}
          onBlur={() => setIsEditing(false)}
          onKeyDown={e =>
            submitInput({
              async enter() {
                await renameAccount({
                  variables: {
                    budgetId,
                    id,
                    name: e.currentTarget.value,
                  },
                });
                setIsEditing(false);
              },
              escape() {
                setIsEditing(false);
              },
              event: e,
            })
          }
          autoFocus
        />
      ) : (
        <div className={styles.accountName}>{name}</div>
      )}
      <button
        className={styles.edit}
        onClick={() => setIsEditing(true)}
        type="button"
      >
        <Edit aria-label="Edit account" />
      </button>
      <AccountIcon className={styles.typeIcon} />
      <div className={styles.accountType}>Checking</div>
    </div>
  );
};

export default Account;
