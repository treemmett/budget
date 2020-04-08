import { Allocation, CategoryGroup, TransactionCategory } from 'rudget';
import React, { FC } from 'react';
import { BudgetProps } from '../Budget/Budget';
import Group from './components/Group';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import useGraphQLError from '../../utils/useGraphQLError';
import { useQuery } from '@apollo/react-hooks';

type AllocationQuery = Pick<Allocation, 'amount'>;
interface CategoryQuery extends Pick<TransactionCategory, 'id' | 'name'> {
  allocation: AllocationQuery;
}
interface GroupQuery extends Pick<CategoryGroup, 'id' | 'name'> {
  allocation: AllocationQuery;
  categories: CategoryQuery[];
}

interface GetCategoriesResponse {
  budget: { categoryGroups: GroupQuery[] };
}

interface GetCategoriesInput {
  budgetId: string;
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
  const { loading, data, error } = useQuery<
    GetCategoriesResponse,
    GetCategoriesInput
  >(GET_CATEGORIES, {
    onError: graphError,
    variables: { budgetId },
  });

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
