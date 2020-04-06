import React, { FC } from 'react';
import { BudgetProps } from '../Budget/Budget';
import Group from './components/Group';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import useGraphQLError from '../../utils/useGraphQLError';
import { useQuery } from '@apollo/react-hooks';

interface Categories {
  budget: {
    categoryGroups: {
      id: string;
      name: string;
      allocation: Allocation;
      categories: {
        id: string;
        name: string;
        allocation: Allocation;
      }[];
    }[];
  };
}

interface Allocation {
  amount: number;
}

const GET_CATEGORIES = gql`
  query GetCategories($budgetId: String!) {
    budget(id: $budgetId) {
      categoryGroups {
        id
        name
        allocation {
          amount
        }
        categories {
          id
          name
          allocation {
            amount
          }
        }
      }
    }
  }
`;

const Categories: FC<RouteComponentProps<BudgetProps>> = ({ budgetId }) => {
  const graphError = useGraphQLError();
  const { loading, data, error } = useQuery<Categories, { budgetId: string }>(
    GET_CATEGORIES,
    {
      onError: graphError,
      variables: { budgetId },
    }
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className={globalStyles.view}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  return (
    <div className={globalStyles.view}>
      {data.budget.categoryGroups.map(group => (
        <Group group={group} key={group.id} />
      ))}
    </div>
  );
};

export default Categories;
