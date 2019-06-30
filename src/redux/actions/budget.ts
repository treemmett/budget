/* eslint-disable import/prefer-default-export */
import {
  ALLOCATE_FUNDS,
  AllocateFunds,
  Category,
  CategoryAllocation,
  GET_BUDGETS,
  GET_CATEGORIES,
  GetBudgets,
  GetCategories,
  Group,
  SET_CATEGORIES,
  SetCategories
} from '../types/budget';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axios';

export const allocateFunds = (
  budgetId: string,
  categoryId: string,
  amount: string,
  month: number,
  year: number
): ThunkAction<Promise<void>, State, null, AllocateFunds> => async (
  dispatch,
  getState
) => {
  const str = amount.replace(/\D/gi, '');
  const num = Number(str) / 100;
  await axios({
    method: 'PUT',
    url: `/budgets/${budgetId}/categories/${categoryId}/${year}/${month}`,
    data: {
      amount: num.toString()
    }
  });

  const payload: {
    categoryId: string;
    month: number;
    year: number;
    amount: string;
    index?: number;
  } = {
    categoryId,
    month,
    year,
    amount
  };

  // check if we can update an existing member of state
  const { budget } = getState();
  const index = budget.categoryAllocation.findIndex(
    a => a.categoryId === categoryId && a.month === month && a.year === year
  );

  if (index > -1) {
    payload.index = index;
  }

  dispatch({
    type: ALLOCATE_FUNDS,
    payload
  });
};

export const changeCategoryPosition = (
  categoryId: string,
  index: number
): ThunkAction<void, State, null, SetCategories> => (dispatch, getState) => {
  const { categories, selectedBudget } = getState().budget;

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    throw new Error(`Category ID ${categoryId} not found.`);
  }

  // resort categories in our group
  const groupCategories = categories
    .filter(c => c.groupId === category.groupId)
    .sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });
  const categoryIndex = groupCategories.findIndex(c => c.id === categoryId);
  const [splicedCategory] = groupCategories.splice(categoryIndex, 1);
  groupCategories.splice(index, 0, splicedCategory);

  // get categories that aren't being resorted
  const otherCategories = categories.filter(
    c => c.groupId !== category.groupId
  );

  dispatch({
    type: SET_CATEGORIES,
    payload: {
      categories: [
        ...otherCategories,
        ...groupCategories.map((c, i) => ({ ...c, sort: i }))
      ]
    }
  });

  // send update request
  axios({
    method: 'PATCH',
    url: `/budgets/${selectedBudget}/categories/${categoryId}`,
    data: { index }
  });
};

export const getCategories = (
  budgetId: string
): ThunkAction<Promise<void>, State, null, GetCategories> => async dispatch => {
  const response = await axios({
    url: `/budgets/${budgetId}`
  });

  const budgetData = response.data as {
    id: string;
    name: string;
    groups: {
      id: string;
      name: string;
      budgetId?: string;
      categories: {
        amount: string;
        id: string;
        name: string;
        sort: number;
        groupId?: string;
      }[];
    }[];
  };

  const date = new Date();

  const [groups, categories, categoryAllocations] = budgetData.groups.reduce(
    (acc, group) => {
      const cs = group.categories.map(({ amount, ...c }) => {
        acc[2].push({
          categoryId: c.id,
          amount,
          month: date.getMonth(),
          year: date.getFullYear()
        });

        return {
          ...c,
          groupId: group.id
        };
      });

      acc[0].push({ budgetId, id: group.id, name: group.name });
      acc[1].push(...cs);

      return acc;
    },
    [[] as Group[], [] as Category[], [] as CategoryAllocation[]]
  );

  dispatch({
    type: GET_CATEGORIES,
    payload: {
      categories,
      categoryAllocations,
      groups
    }
  });
};

export const getBudgets = (): ThunkAction<
  Promise<void>,
  State,
  null,
  GetBudgets
> => async dispatch => {
  const { data } = await axios({
    url: '/budgets'
  });

  dispatch({
    type: GET_BUDGETS,
    payload: {
      budgets: data,
      selectedBudget: data[0].id
    }
  });
  dispatch(getCategories(data[0].id));
};
