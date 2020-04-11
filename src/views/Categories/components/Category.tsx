import React, { FC } from 'react';
import { BudgetProps } from '../../Budget/Budget';
import Loader from '../../../components/Loader/Loader';
import cx from 'classnames';
import formatCurrency from '../../../utils/formatCurrency';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import { useParams } from '@reach/router';
import { useQuery } from '@apollo/react-hooks';

interface GetCategory {
  budget: {
    category: {
      allocation: {
        amount: number;
      };
      name: string;
    };
  };
}

interface GetCategoryInput {
  budgetId: string;
  id: string;
}

interface CategoryProps {
  id: string;
}

const GET_CATEGORY = gql`
  query GetCategory($id: String!, $budgetId: String!) {
    budget(id: $budgetId) {
      category(id: $id) {
        allocation {
          amount
        }
        name
      }
    }
  }
`;

const Category: FC<CategoryProps> = ({ id }) => {
  const { budgetId } = useParams() as BudgetProps;
  const { data, error, loading } = useQuery<GetCategory, GetCategoryInput>(
    GET_CATEGORY,
    {
      variables: { budgetId, id },
    }
  );

  if (error) {
    return (
      <div className={cx(styles.category, styles.primitive)}>
        Category failed to load.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cx(styles.category, styles.primitive)}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <div className={styles.title}>{data.budget.category.name}</div>
      <div className={styles.field}>
        {formatCurrency(data.budget.category.allocation.amount)}
      </div>
    </div>
  );
};

export default Category;
