/* eslint-disable import/prefer-default-export */
import {
  ADD_CATEGORY,
  ADD_TRANSACTION,
  ALLOCATE_FUNDS,
  AddCategory,
  AddTransaction,
  AllocateFunds,
  CHANGE_DATE,
  Category,
  CategoryAllocation,
  ChangeDate,
  GET_BUDGETS,
  GET_CATEGORIES,
  GetBudgets,
  GetCategories,
  Group,
  SET_CATEGORIES,
  SET_GROUPS,
  SET_TRANSACTIONS,
  SetCategories,
  SetGroups,
  SetTransactions
} from '../types/budget';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axios';

export const addCategory = (
  name: string,
  groupId: string
): ThunkAction<Promise<void>, State, null, AddCategory> => async (
  dispatch,
  getState
) => {
  const { selectedBudget } = getState().budget;

  const { data } = await axios({
    method: 'POST',
    url: `/budgets/${selectedBudget}/groups/${groupId}/category`,
    data: {
      name
    }
  });

  dispatch({
    type: ADD_CATEGORY,
    payload: {
      ...data,
      groupId
    }
  });
};

export const addTransaction = (
  description: string,
  date: string,
  amount: number,
  categoryId: string
): ThunkAction<Promise<void>, State, null, AddTransaction> => async (
  dispatch,
  getState
) => {
  const { selectedBudget } = getState().budget;

  const { data } = await axios({
    method: 'POST',
    url: `/budgets/${selectedBudget}/categories/${categoryId}/transactions`,
    data: {
      amount,
      date,
      description
    }
  });

  dispatch({
    type: ADD_TRANSACTION,
    payload: data
  });
};

export const allocateFunds = (
  budgetId: string,
  categoryId: string,
  amount: number,
  month: number,
  year: number
): ThunkAction<Promise<void>, State, null, AllocateFunds> => async (
  dispatch,
  getState
) => {
  await axios({
    method: 'PUT',
    url: `/budgets/${budgetId}/categories/${categoryId}/${year}/${month}`,
    data: {
      amount
    }
  });

  const payload: {
    categoryId: string;
    month: number;
    year: number;
    amount: number;
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
  groupId: string,
  index: number
): ThunkAction<void, State, null, SetCategories> => (dispatch, getState) => {
  const { categories, selectedBudget } = getState().budget;

  const category = categories.find(c => c.id === categoryId);

  if (!category) {
    throw new Error(`Category ID ${categoryId} not found.`);
  }

  category.groupId = groupId;

  // resort categories in the groups
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
    data: { group: groupId, index }
  });
};

export const changeDate = (
  direction: -1 | 1
): ThunkAction<void, State, null, ChangeDate> => (dispatch, getState) => {
  const date = new Date();
  const { year, month } = getState().budget;
  date.setFullYear(year);
  date.setMonth(month + direction);

  dispatch({
    type: CHANGE_DATE,
    payload: {
      month: date.getMonth(),
      year: date.getFullYear()
    }
  });
};

export const changeGroupPosition = (
  groupId: string,
  index: number
): ThunkAction<void, State, null, SetGroups> => (dispatch, getState) => {
  const { groups, selectedBudget } = getState().budget;

  // resort groups in the budget
  const budgetGroups = groups
    .filter(g => g.budgetId === selectedBudget)
    .sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });
  const groupIndex = budgetGroups.findIndex(g => g.id === groupId);
  const [splicedGroup] = budgetGroups.splice(groupIndex, 1);
  budgetGroups.splice(index, 0, splicedGroup);

  // get categories that aren't being resorted
  const otherGroups = groups.filter(g => g.budgetId !== selectedBudget);

  dispatch({
    type: SET_GROUPS,
    payload: {
      groups: [
        ...otherGroups,
        ...budgetGroups.map((c, i) => ({ ...c, sort: i }))
      ]
    }
  });

  // send update request
  axios({
    method: 'PATCH',
    url: `/budgets/${selectedBudget}/groups/${groupId}`,
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
      sort: number;
      budgetId?: string;
      categories: {
        amount: number;
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

      acc[0].push({
        budgetId,
        id: group.id,
        name: group.name,
        sort: group.sort
      });
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

export const getTransactions = (
  budetId: string
): ThunkAction<
  Promise<void>,
  State,
  null,
  SetTransactions
> => async dispatch => {
  const { data } = await axios({
    url: `/budgets/${budetId}/transactions`
  });

  dispatch({
    type: SET_TRANSACTIONS,
    payload: data
  });
};
