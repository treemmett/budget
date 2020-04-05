import React, { FC } from 'react';
import { BudgetProps } from '../Budget/Budget';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import styles from './Categories.scss';
import useGraphQLError from '../../utils/useGraphQLError';
import { useQuery } from '@apollo/react-hooks';

interface Categories {
  budget: {
    categoryGroups: {
      id: string;
      name: string;
      categories: {
        id: string;
        name: string;
      }[];
    }[];
  };
}

const GET_CATEGORIES = gql`
  query GetCategories($budgetId: String!) {
    budget(id: $budgetId) {
      categoryGroups {
        id
        name
        categories {
          id
          name
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
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <div className={globalStyles.view}>
      {data.budget.categoryGroups.map(group => (
        <div className={styles.group} key={group.id}>
          <div className={styles.header}>
            <div className={styles.title}>{group.name}</div>
          </div>
          <div className={styles.categories}>
            {group.categories.map(category => (
              <div className={styles.category} key={category.id}>
                {category.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
