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
  Group
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
