import React, { FC, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { Budget } from 'rudget';
import Category from './Category';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import { Draggable } from 'react-beautiful-dnd';
import Loader from '../../../components/Loader/Loader';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import { toDisplay } from '../../../utils/formatCurrency';
import useGraphQLError from '../../../utils/useGraphQLError';
import { useQuery } from '@apollo/react-hooks';

interface GroupProps {
  budgetId: string;
  id: string;
  index: number;
}

interface GetCategoryGroup {
  budget: Budget;
}

interface GetCategoryGroupInput {
  budgetId: string;
  date: {
    month: number;
    year: number;
  };
  id: string;
}

const GET_CATEGORY_GROUP = gql`
  query GetCategoryGroup(
    $id: ID!
    $budgetId: ID!
    $date: AllocationDateInput!
  ) {
    budget(id: $budgetId) {
      categoryGroup(id: $id) {
        name
        categories {
          id
          name
          allocation(date: $date)
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
    variables: {
      budgetId,
      date: { month: new Date().getMonth(), year: new Date().getFullYear() },
      id,
    },
  });
  const transition = useTransition(!collapsed, null, {
    config: { clamp: true, friction: 51, mass: 1, tension: 268 },
    enter: {
      height: `${
        loading ? 0 : data.budget.categoryGroup.categories.length * 3.25
      }rem`,
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
            <div className={styles.title}>{data.budget.categoryGroup.name}</div>
            <div className={styles.key}>Allocated</div>
            <div className={styles.field}>
              {toDisplay(
                data.budget.categoryGroup.categories.reduce(
                  (acc, cur) => acc + cur.allocation,
                  0
                )
              )}
            </div>
            <div className={styles.border} />
            <button
              aria-label={`Collapse group ${data.budget.categoryGroup.name}`}
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
                  {data.budget.categoryGroup.categories.map(category => (
                    <Category groupId={id} id={category.id} key={category.id} />
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
