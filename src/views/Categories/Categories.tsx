import { CategoryGroup, TransactionCategory } from 'rudget';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import React, { FC } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import { BudgetProps } from '../Budget/Budget';
import Fab from '../../components/Fab/Fab';
import Group from './components/Group';
import Loader from '../../components/Loader/Loader';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import gql from 'graphql-tag';
import styles from './Categories.scss';
import useGraphQLError from '../../utils/useGraphQLError';

type CategoryQuery = Pick<TransactionCategory, 'id' | 'allocation' | 'name'>;

interface GroupQuery extends Pick<CategoryGroup, 'id' | 'name' | 'sort'> {
  categories: CategoryQuery[];
}

interface GetCategoriesResponse {
  budget: { categoryGroups: GroupQuery[] };
}

interface GetCategoriesInput {
  date: {
    month: number;
    year: number;
  };
  budgetId: string;
}

const GET_CATEGORIES = gql`
  query GetCategories($budgetId: ID!, $date: AllocationDateInput!) {
    budget(id: $budgetId) {
      categoryGroups {
        id
        name
        sort
        categories {
          id
          name
          allocation(date: $date)
        }
      }
    }
  }
`;

interface SortCategoryGroup {
  sortCategoryGroup: {
    id: string;
    sort: number;
    __typename: string;
  }[];
}

interface SortCategoryGroupInput {
  budgetId: string;
  id: string;
  index: number;
}

const SORT_CATEGORY_GROUP = gql`
  mutation SortCategoryGroup($budgetId: ID!, $id: ID!, $index: Int!) {
    sortCategoryGroup(budgetId: $budgetId, id: $id, index: $index) {
      id
      sort
      name
    }
  }
`;

interface CreateCategoryGroup {
  createCategoryGroup: CategoryGroup;
}

interface CreateCategoryGroupInput {
  budgetId: string;
  date: {
    month: number;
    year: number;
  };
  name: string;
}

const CREATE_CATEGORY_GROUP = gql`
  mutation CreateCategoryGroup(
    $budgetId: ID!
    $name: String!
    $date: AllocationDateInput!
  ) {
    createCategoryGroup(budgetId: $budgetId, name: $name) {
      id
      name
      sort
      categories {
        id
        name
        allocation(date: $date)
      }
    }
  }
`;

const Categories: FC<RouteComponentProps<BudgetProps>> = ({ budgetId }) => {
  const client = useApolloClient();
  const graphError = useGraphQLError();
  const [sortCategoryGroup] = useMutation<
    SortCategoryGroup,
    SortCategoryGroupInput
  >(SORT_CATEGORY_GROUP, { onError: graphError });
  const [createCategoryGroup] = useMutation<
    CreateCategoryGroup,
    CreateCategoryGroupInput
  >(CREATE_CATEGORY_GROUP, {
    update(cache, { data }) {
      const cached = cache.readQuery<GetCategoriesResponse>({
        query: GET_CATEGORIES,
        variables: {
          budgetId,
          date: {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
        },
      });
      cached.budget.categoryGroups.push(data.createCategoryGroup);
      cache.writeQuery<GetCategoriesResponse>({
        data: cached,
        query: GET_CATEGORIES,
        variables: {
          budgetId,
          date: {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
        },
      });
    },
  });
  const { loading, data, error } = useQuery<
    GetCategoriesResponse,
    GetCategoriesInput
  >(GET_CATEGORIES, {
    onError: graphError,
    variables: {
      budgetId,
      date: { month: new Date().getMonth(), year: new Date().getFullYear() },
    },
  });

  if (error) {
    return (
      <div className={globalStyles.view}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={globalStyles.viewLoading}>
        <Loader size="large" />
      </div>
    );
  }

  async function sortGroup(result: DropResult): Promise<void> {
    // update sorting in cache
    const cachedData = client.readQuery<
      GetCategoriesResponse,
      GetCategoriesInput
    >({
      query: GET_CATEGORIES,
      variables: {
        budgetId,
        date: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
      },
    });

    cachedData.budget.categoryGroups.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });

    const [group] = cachedData.budget.categoryGroups.splice(
      result.source.index,
      1
    );

    cachedData.budget.categoryGroups.splice(result.destination.index, 0, group);

    await sortCategoryGroup({
      optimisticResponse: {
        sortCategoryGroup: cachedData.budget.categoryGroups.map((g, i) => ({
          __typename: 'CategoryGroup',
          ...g,
          sort: i,
        })),
      },
      variables: {
        budgetId,
        id: result.draggableId,
        index: result.destination.index,
      },
    });
  }

  return (
    <DragDropContext onDragEnd={sortGroup}>
      <div className={globalStyles.view}>
        <Droppable droppableId="group">
          {provided => (
            <div
              className={styles.groups}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {[...data.budget.categoryGroups]
                .sort((a, b) => {
                  if (a.sort > b.sort) return 1;
                  if (a.sort < b.sort) return -1;
                  return 0;
                })
                .map((group, i) => (
                  <Group
                    budgetId={budgetId}
                    id={group.id}
                    index={i}
                    key={group.id}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Fab
          onClick={() =>
            createCategoryGroup({
              variables: {
                budgetId,
                date: {
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
                },
                // TODO: add better prompt
                // eslint-disable-next-line no-alert
                name: prompt('Group name'),
              },
            })
          }
        >
          +
        </Fab>
      </div>
    </DragDropContext>
  );
};

export default Categories;
