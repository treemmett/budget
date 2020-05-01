import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BudgetProps } from '../../Budget/Budget';
import Loader from '../../../components/Loader/Loader';
import cx from 'classnames';
import formatCurrency from '../../../utils/formatCurrency';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import useGraphQLError from '../../../utils/useGraphQLError';
import { useParams } from '@reach/router';

interface CategoryProps {
  id: string;
  groupId: string;
}

interface GetCategory {
  budget: {
    categoryGroup: {
      category: {
        allocation: number;
        name: string;
      };
    };
  };
}

interface GetCategoryInput {
  budgetId: string;
  groupId: string;
  id: string;
  date: {
    month: number;
    year: number;
  };
}

const GET_CATEGORY = gql`
  query GetCategory(
    $id: ID!
    $budgetId: ID!
    $groupId: ID!
    $date: AllocationDateInput!
  ) {
    budget(id: $budgetId) {
      categoryGroup(id: $groupId) {
        category(id: $id) {
          allocation(date: $date)
          name
        }
      }
    }
  }
`;

interface AllocateCategory {
  allocateCategory: {
    id: string;
    allocation: number;
  };
}

interface AllocateCategoryInput {
  amount: number;
  id: string;
  budgetId: string;
  date: {
    month: number;
    year: number;
  };
}

const ALLOCATE_CATEGORY = gql`
  mutation AllocateCategory(
    $id: ID!
    $budgetId: ID!
    $amount: Int!
    $date: AllocationDateInput!
  ) {
    allocateCategory(
      id: $id
      budgetId: $budgetId
      amount: $amount
      date: $date
    ) {
      id
      allocation(date: $date)
    }
  }
`;

const Category: FC<CategoryProps> = ({ id, groupId }) => {
  const graphError = useGraphQLError();
  const { budgetId } = useParams() as BudgetProps;
  const [allocateCategory] = useMutation<
    AllocateCategory,
    AllocateCategoryInput
  >(ALLOCATE_CATEGORY, { onError: graphError });
  const [allocatedInput, setAllocatedInput] = useState(0);
  const { data, error, loading } = useQuery<GetCategory, GetCategoryInput>(
    GET_CATEGORY,
    {
      variables: {
        budgetId,
        date: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        groupId,
        id,
      },
    }
  );

  useEffect(() => {
    setAllocatedInput(data?.budget.categoryGroup.category.allocation || 0);
  }, [data]);

  function maskInput(input: string): number {
    const replacedInput = input.replace(/[^0-9]/g, '');

    const int = parseInt(replacedInput, 10);

    setAllocatedInput(int / 100);
    return int / 100;
  }

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
      <div className={styles.title}>
        {data.budget.categoryGroup.category.name}
      </div>
      <div className={styles.field}>
        <input
          className={styles.input}
          onBlur={e => {
            allocateCategory({
              variables: {
                amount: maskInput(e.currentTarget.value),
                budgetId,
                date: {
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                },
                id,
              },
            }).catch(() => {});
          }}
          onChange={e => maskInput(e.currentTarget.value)}
          placeholder="$0.00"
          value={allocatedInput > 0 ? formatCurrency(allocatedInput) : ''}
        />
      </div>
    </div>
  );
};

export default Category;
