import { Budget, TransactionCategory } from 'rudget';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import AnimateHeight from 'react-animate-height';
import Category from './Category';
import ChevronDown from '../../../assets/icons/chevronDown.svg';
import Loader from '../../../components/Loader/Loader';
import Plus from '../../../assets/icons/plusCircle.svg';
import cx from 'classnames';
import gql from 'graphql-tag';
import styles from '../Categories.scss';
import submitInput from '../../../utils/submitInput';
import { toDisplay } from '../../../utils/formatCurrency';

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
        id
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

interface RenameGroup {
  renameCategoryGroup: {
    __typename: string;
    id: string;
    name: string;
  };
}

interface RenameGroupInput {
  id: string;
  name: string;
  budgetId: string;
}

const RENAME_GROUP = gql`
  mutation RenameGroup($id: ID!, $budgetId: ID!, $name: String!) {
    renameCategoryGroup(id: $id, budgetId: $budgetId, name: $name) {
      id
      name
    }
  }
`;

const Group: FC<GroupProps> = ({ budgetId, id, index }) => {
  const { data, error, loading } = useQuery<
    GetCategoryGroup,
    GetCategoryGroupInput
  >(GET_CATEGORY_GROUP, {
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

  const [collapsed, setCollapsed] = useState(false);

  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const [renameGroup] = useMutation<RenameGroup, RenameGroupInput>(
    RENAME_GROUP
  );

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
            {isChangingTitle ? (
              <input
                aria-label="Group name"
                className={cx(styles.title, styles.edit)}
                defaultValue={data.budget.categoryGroup.name}
                onBlur={() => setIsChangingTitle(false)}
                onKeyDown={e =>
                  submitInput({
                    enter: async () => {
                      await renameGroup({
                        optimisticResponse: {
                          renameCategoryGroup: {
                            __typename: 'CategoryGroup',
                            id,
                            name: e.currentTarget.value,
                          },
                        },
                        variables: {
                          budgetId,
                          id,
                          name: e.currentTarget.value,
                        },
                      });
                      setIsChangingTitle(false);
                    },
                    escape: () => setIsChangingTitle(false),
                    event: e,
                  })
                }
                autoFocus
              />
            ) : (
              <div className={styles.title}>
                <span
                  className={styles.text}
                  onDoubleClick={() => setIsChangingTitle(true)}
                >
                  {data.budget.categoryGroup.name}
                </span>
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
            )}
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
          <Droppable droppableId={id} key={id} type="categories">
            {categoriesProvided => (
              <AnimateHeight
                duration={300}
                easing="ease-in-out"
                height={collapsed ? 0 : 'auto'}
              >
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
              </AnimateHeight>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Group;
