import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Button from '../../components/Button/Button';
import Fab from '../../components/Fab/Fab';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import styles from './Budgets.scss';
import useGraphQLError from '../../utils/useGraphQLError';

interface Budget {
  id: string;
  name: string;
  __typename: string;
}

interface Budgets {
  budgets: Budget[];
}

const CREATE_BUDGET = gql`
  mutation CreateBudget($name: String!) {
    createBudget(name: $name) {
      id
      name
    }
  }
`;

const GET_BUDGETS = gql`
  query getBudgets {
    budgets {
      id
      name
    }
  }
`;

const Budget: FC<RouteComponentProps> = () => {
  const errorToToast = useGraphQLError();
  const [createBudget] = useMutation<
    { createBudget: Budget },
    { name: string }
  >(CREATE_BUDGET);
  const { loading, data, error } = useQuery<Budgets>(GET_BUDGETS);
  const [createNewBudget, setCreateNewBudget] = useState(false);
  const [newBudgetName, setNewBudgetName] = useState('');

  useEffect(() => {
    setNewBudgetName('');
  }, [createNewBudget]);

  async function createBudgetAction(name: string): Promise<void> {
    try {
      await createBudget({
        update(cache, { data: updateData }) {
          const { budgets } = cache.readQuery<Budgets>({ query: GET_BUDGETS });
          cache.writeQuery<Budgets>({
            query: GET_BUDGETS,
            data: {
              budgets: [...budgets, updateData.createBudget]
            }
          });
        },
        variables: {
          name
        }
      });

      setCreateNewBudget(false);
    } catch (e) {
      errorToToast(e, 'Budget creation failed');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={globalStyles.view}>
      {data.budgets.map(budget => (
        <div className={styles.budget} key={budget.id}>
          <span className={styles.name}>{budget.name}</span>
        </div>
      ))}
      {createNewBudget && (
        <div className={styles.budget}>
          <input
            className={styles.name}
            onKeyDown={e => {
              if (e.key === 'Enter') createBudgetAction(e.currentTarget.value);
              if (e.key === 'Esc') setCreateNewBudget(false);
            }}
            onChange={e => setNewBudgetName(e.currentTarget.value)}
            value={newBudgetName}
            autoFocus
          />
          <Button onClick={() => createBudgetAction(newBudgetName)}>
            Save
          </Button>
          <Button onClick={() => setCreateNewBudget(false)} color="red">
            Cancel
          </Button>
        </div>
      )}
      {!createNewBudget && (
        <Fab onClick={() => setCreateNewBudget(true)}>+</Fab>
      )}
    </div>
  );
};

export default Budget;
