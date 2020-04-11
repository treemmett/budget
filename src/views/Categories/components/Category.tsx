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

interface GetCategory {
  budget: {
    category: {
      allocation: {
        amount: number;
        id: string;
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
          id
          amount
        }
        name
      }
    }
  }
`;

interface AllocateCategory {
  allocateCategory: {
    amount: number;
  };
}

interface AllocateCategoryInput {
  input: {
    amount: number;
    budgetId: string;
    categoryId: string;
    month?: number;
    year?: number;
  };
}

const ALLOCATE_CATEGORY = gql`
  mutation AllocateCategory($input: AllocateCategoryInput!) {
    allocateCategory(input: $input) {
      amount
    }
  }
`;

const Category: FC<CategoryProps> = ({ id }) => {
  const graphError = useGraphQLError();
  const { budgetId } = useParams() as BudgetProps;
  const [allocateCategory] = useMutation<
    AllocateCategory,
    AllocateCategoryInput
  >(ALLOCATE_CATEGORY, {
    onError: graphError,
    update: (cache, { data }) => {
      const cached = cache.readQuery<GetCategory, GetCategoryInput>({
        query: GET_CATEGORY,
        variables: { budgetId, id },
      });

      cached.budget.category.allocation.amount = data.allocateCategory.amount;

      cache.writeQuery<GetCategory, GetCategoryInput>({
        data: {
          ...cached,
          budget: {
            ...cached.budget,
            category: {
              ...cached.budget.category,
              allocation: {
                ...cached.budget.category.allocation,
                amount: data.allocateCategory.amount,
              },
            },
          },
        },
        query: GET_CATEGORY,
        variables: {
          budgetId,
          id,
        },
      });
    },
  });
  const [allocatedInput, setAllocatedInput] = useState(0);
  const { data, error, loading } = useQuery<GetCategory, GetCategoryInput>(
    GET_CATEGORY,
    {
      variables: { budgetId, id },
    }
  );

  useEffect(() => {
    setAllocatedInput(data?.budget.category.allocation?.amount || 0);
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
      <div className={styles.title}>{data.budget.category.name}</div>
      <div className={styles.field}>
        <input
          className={styles.input}
          onBlur={e => {
            allocateCategory({
              variables: {
                input: {
                  amount: maskInput(e.currentTarget.value),
                  budgetId,
                  categoryId: id,
                },
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
