import { Budget, TransactionCategory } from 'rudget';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Category from './Category';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import Loader from '../../../components/Loader/Loader';
import Plus from '../../../assets/icons/plusCircle.svg';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import submitInput from '../../../utils/submitInput';
import { toDisplay } from '../../../utils/formatCurrency';
import useGraphQLError from '../../../utils/useGraphQLError';

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
          sort
        }
      }
    }
  }
`;

interface CreateCategory {
  createCategory: TransactionCategory;
}

interface CreateCategoryInput {
  budget: string;
  date: {
    month: number;
    year: number;
  };
  group: string;
  name: string;
}

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $budget: ID!
    $group: ID!
    $name: String!
    $date: AllocationDateInput!
  ) {
    createCategory(budgetId: $budget, groupId: $group, name: $name) {
      id
      name
      allocation(date: $date)
      sort
    }
  }
`;

const Group: FC<GroupProps> = ({ budgetId, id, index }) => {
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

  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [createCategory] = useMutation<CreateCategory, CreateCategoryInput>(
    CREATE_CATEGORY,
    {
      onError: graphError,
      update: (cache, results) => {
        const cached = cache.readQuery<GetCategoryGroup, GetCategoryGroupInput>(
          {
            query: GET_CATEGORY_GROUP,
            variables: {
              budgetId,
              date: {
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
              },
              id,
            },
          }
        );

        cached.budget.categoryGroup.categories.push(
          results.data.createCategory
        );

        cache.writeQuery<GetCategoryGroup, GetCategoryGroupInput>({
          data: cached,
          query: GET_CATEGORY_GROUP,
          variables: {
            budgetId,
            date: {
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
            },
            id,
          },
        });
      },
    }
  );

  const [collapsed, setCollapsed] = useState(true);
  const transition = useTransition(!collapsed, null, {
    config: { clamp: true, friction: 51, mass: 1, tension: 268 },
    enter: {
      height: `${
        (loading ? 0 : data.budget.categoryGroup.categories.length) * 3.25
      }rem`,
    },
    from: { height: '0rem' },
    leave: { height: '0rem' },
    update: {
      height: `${
        (loading ? 0 : data.budget.categoryGroup.categories.length) * 3.25
      }rem`,
    },
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
            <div className={styles.title}>
              <span>{data.budget.categoryGroup.name}</span>
              <button
                className={styles.plus}
                onClick={() => setIsCreatingCategory(true)}
                type="button"
              >
                <Plus />
              </button>
              {isCreatingCategory && (
                <div className={styles.tooltip}>
                  <input
                    onBlur={() => setIsCreatingCategory(false)}
                    onKeyDown={e =>
                      submitInput({
                        enter: async evt => {
                          await createCategory({
                            variables: {
                              budget: budgetId,
                              date: {
                                month: new Date().getMonth(),
                                year: new Date().getFullYear(),
                              },
                              group: id,
                              name: evt.currentTarget.value,
                            },
                          });
                          setIsCreatingCategory(false);
                        },
                        escape: () => setIsCreatingCategory(false),
                        event: e,
                      })
                    }
                    placeholder="New category name"
                    autoFocus
                  />
                </div>
              )}
            </div>
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
                <animated.div key={key} style={props}>
                  <Droppable droppableId={id} key={id} type="categories">
                    {categoriesProvided => (
                      <div
                        className={styles.categories}
                        ref={categoriesProvided.innerRef}
                        {...categoriesProvided.droppableProps}
                      >
                        {[...data.budget.categoryGroup.categories]
                          .sort((a, b) => {
                            if (a.sort > b.sort) return 1;
                            if (a.sort < b.sort) return -1;
                            return 0;
                          })
                          .map((category, i) => (
                            <Category
                              groupId={id}
                              id={category.id}
                              index={i}
                              key={category.id}
                            />
                          ))}
                        {categoriesProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </animated.div>
              )
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Group;
