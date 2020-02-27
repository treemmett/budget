import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Fab from '../../components/Fab/Fab';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import styles from './Budgets.scss';

interface Budget {
  id: string;
  name: string;
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
  const [createBudget] = useMutation<
    { createBudget: Budget },
    { name: string }
  >(CREATE_BUDGET);
  const { loading, data, error } = useQuery<Budgets>(GET_BUDGETS);

  async function createBudgetAction(name: string): Promise<void> {
    await createBudget({
      update(cache, { data: updateData }) {
        const { budgets } = cache.readQuery<Budgets>({ query: GET_BUDGETS });
        cache.writeQuery<Budgets>({
          query: GET_BUDGETS,
          data: { budgets: [...budgets, updateData.createBudget] }
        });
      },
      variables: {
        name
      }
    });
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
          {budget.name}
        </div>
      ))}
      {/* TODO: add better way to input */}
      {/* eslint-disable-next-line no-alert */}
      <Fab onClick={() => createBudgetAction(prompt('Budget name'))}>+</Fab>
    </div>
  );
};

export default Budget;
