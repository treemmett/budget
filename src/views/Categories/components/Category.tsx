import React, { FC, useEffect, useState } from 'react';
import { toCents, toDisplay } from '../../../utils/formatCurrency';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { BudgetProps } from '../../Budget/Budget';
import { Draggable } from 'react-beautiful-dnd';
import Loader from '../../../components/Loader/Loader';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import useGraphQLError from '../../../utils/useGraphQLError';
import { useParams } from '@reach/router';

interface CategoryProps {
  id: string;
  index: number;
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
        id
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

const Category: FC<CategoryProps> = ({ id, index, groupId }) => {
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

  function maskInput(input: string): void {
    // const replacedInput = input.replace(/[^0-9]/g, '');
    // setAllocatedInput(parseInt(replacedInput, 10));
    setAllocatedInput(toCents(input));
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
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <div
          className={styles.category}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className={styles.title}>
            {data.budget.categoryGroup.category.name}
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              onBlur={() => {
                allocateCategory({
                  variables: {
                    amount: allocatedInput,
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
              value={allocatedInput > 0 ? toDisplay(allocatedInput) : ''}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Category;
