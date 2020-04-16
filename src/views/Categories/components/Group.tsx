import { Allocation, CategoryGroup, TransactionCategory } from 'rudget';
import React, { FC, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import Category from './Category';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import { Draggable } from 'react-beautiful-dnd';
import Loader from '../../../components/Loader/Loader';
import cx from 'classnames';
import formatCurrency from '../../../utils/formatCurrency';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import useGraphQLError from '../../../utils/useGraphQLError';
import { useQuery } from '@apollo/react-hooks';

type AllocationCustom = Pick<Allocation, 'amount'>;
interface CategoryCustom extends Pick<TransactionCategory, 'id' | 'name'> {
  allocation: AllocationCustom;
}
interface GroupCustom extends Pick<CategoryGroup, 'name'> {
  name: string;
  allocation: AllocationCustom;
  categories: CategoryCustom[];
}

interface GroupProps {
  budgetId: string;
  id: string;
  index: number;
}

interface GetCategoryGroup {
  categoryGroup: GroupCustom;
}

interface GetCategoryGroupInput {
  budgetId: string;
  id: string;
}

const GET_CATEGORY_GROUP = gql`
  query GetCategoryGroup($id: ID!, $budgetId: ID!) {
    categoryGroup(id: $id, budgetId: $budgetId) {
      name
      categories {
        id
        name
        allocation {
          id
          amount
        }
      }
    }
  }
`;

const Group: FC<GroupProps> = ({ budgetId, id, index }) => {
  const [collapsed, setCollapsed] = useState(true);
  const graphError = useGraphQLError();
  const { data, error, loading } = useQuery<
    GetCategoryGroup,
    GetCategoryGroupInput
  >(GET_CATEGORY_GROUP, {
    onError: graphError,
    variables: { budgetId, id },
  });
  const transition = useTransition(!collapsed, null, {
    config: { clamp: true, friction: 51, mass: 1, tension: 268 },
    enter: {
      height: `${loading ? 0 : data.categoryGroup.categories.length * 3.25}rem`,
    },
    from: { height: '0rem' },
    leave: { height: '0rem' },
  });

  useEffect(() => {
    setCollapsed(loading);
  }, [loading]);

  if (loading) {
    return (
      <div className={cx(styles.group, styles.primitive)}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx(styles.group, styles.primitive)}>
        Failed to load group {id}.
      </div>
    );
  }

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className={cx(styles.group, { [styles.collapsed]: collapsed })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.header} {...provided.dragHandleProps}>
            <div className={styles.title}>{data.categoryGroup.name}</div>
            <div className={styles.key}>Allocated</div>
            <div className={styles.field}>
              {formatCurrency(
                data.categoryGroup.categories.reduce(
                  (acc, cur) => acc + cur.allocation.amount,
                  0
                )
              )}
            </div>
            <div className={styles.border} />
            <button
              aria-label={`Collapse group ${data.categoryGroup.name}`}
              className={styles.toggle}
              onClick={() => setCollapsed(s => !s)}
              type="button"
            >
              <ChevronDown />
            </button>
          </div>
          {transition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div
                  className={styles.categories}
                  key={key}
                  style={props}
                >
                  {data.categoryGroup.categories.map(category => (
                    <Category id={category.id} key={category.id} />
                  ))}
                </animated.div>
              )
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Group;
