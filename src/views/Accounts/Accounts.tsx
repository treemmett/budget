import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Account from './components/Account';
import { Account as AccountType } from 'rudget';
import { BudgetProps } from '../Budget/Budget';
import Fab from '../../components/Fab/Fab';
import Loader from '../../components/Loader/Loader';
import { RouteComponentProps } from '@reach/router';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from './Accounts.scss';
import submitInput from '../../utils/submitInput';

interface GetAccounts {
  budget: {
    accounts: AccountType[];
  };
}

interface GetAccountsInput {
  budgetId: string;
}

const GET_ACCOUNTS = gql`
  query GetAccounts($budgetId: ID!) {
    budget(id: $budgetId) {
      accounts {
        id
        name
      }
    }
  }
`;

interface CreateAccount {
  createAccount: AccountType;
}

interface CreateAccountInput {
  name: string;
  budgetId: string;
}

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $budgetId: ID!) {
    createAccount(name: $name, budgetId: $budgetId) {
      id
      name
    }
  }
`;

const Accounts: FC<RouteComponentProps<BudgetProps>> = ({ budgetId }) => {
  const { data, error, loading } = useQuery<GetAccounts, GetAccountsInput>(
    GET_ACCOUNTS,
    { variables: { budgetId } }
  );

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [createAccount] = useMutation<CreateAccount, CreateAccountInput>(
    CREATE_ACCOUNT,
    {
      optimisticResponse(input) {
        return {
          createAccount: {
            id: Math.random().toString(),
            name: input.name,
          },
        };
      },
      update(cache, response) {
        const cached = cache.readQuery<GetAccounts, GetAccountsInput>({
          query: GET_ACCOUNTS,
          variables: { budgetId },
        });

        cached.budget.accounts.push(response.data.createAccount);

        cache.writeQuery({
          data: cached,
          query: GET_ACCOUNTS,
          variables: { budgetId },
        });
      },
    }
  );

  if (error) {
    return (
      <div className={styles.view}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.viewLoading}>
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className={styles.view}>
      <div className={styles.section}>
        <div className={styles.title}>Bank Accounts</div>
        <div className={styles.grid}>
          {data.budget.accounts.map(account => (
            <div className={styles.cell} key={account.id}>
              <Account id={account.id} name={account.name} />
            </div>
          ))}
          {isCreatingAccount && (
            <div className={cx(styles.card, styles.input)}>
              <input
                onBlur={() => setIsCreatingAccount(false)}
                onKeyDown={e =>
                  submitInput({
                    async enter(evt) {
                      await createAccount({
                        variables: { budgetId, name: evt.currentTarget.value },
                      });
                      setIsCreatingAccount(false);
                    },
                    escape() {
                      setIsCreatingAccount(false);
                    },
                    event: e,
                  })
                }
                placeholder="Account Name"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
      <Fab onClick={() => setIsCreatingAccount(true)}>+</Fab>
    </div>
  );
};

export default Accounts;
