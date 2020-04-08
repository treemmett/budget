import { Link, RouteComponentProps } from '@reach/router';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Budget } from 'rudget';
import Button from '../../components/Button/Button';
import Fab from '../../components/Fab/Fab';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import styles from './Budgets.scss';
import useGraphQLError from '../../utils/useGraphQLError';

type BudgetQuery = Pick<Budget, 'id' | 'name'>;

interface GetBudgets {
  budgets: BudgetQuery[];
}

interface Budgets {
  budgets: Budget[];
}

interface CreateBudget {
  createBudget: BudgetQuery;
}

interface CreateBudgetInput {
  name: string;
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

const Budgets: FC<RouteComponentProps> = () => {
  const errorToToast = useGraphQLError();
  const [createBudget] = useMutation<CreateBudget, CreateBudgetInput>(
    CREATE_BUDGET
  );
  const { loading, data, error } = useQuery<GetBudgets>(GET_BUDGETS);
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
            data: {
              budgets: [...budgets, updateData.createBudget],
            },
            query: GET_BUDGETS,
          });
        },
        variables: {
          name,
        },
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
        <Link className={styles.budget} key={budget.id} to={`/${budget.id}`}>
          <span className={styles.name}>{budget.name}</span>
        </Link>
      ))}
      {createNewBudget && (
        <div className={styles.budget}>
          <input
            className={styles.name}
            onChange={e => setNewBudgetName(e.currentTarget.value)}
            onKeyDown={async e => {
              if (e.key === 'Enter')
                await createBudgetAction(e.currentTarget.value);
              if (e.key === 'Esc') setCreateNewBudget(false);
            }}
            value={newBudgetName}
            autoFocus
          />
          <Button onClick={() => createBudgetAction(newBudgetName)}>
            Save
          </Button>
          <Button color="red" onClick={() => setCreateNewBudget(false)}>
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

export default Budgets;
