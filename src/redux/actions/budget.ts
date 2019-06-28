/* eslint-disable import/prefer-default-export */
import {
  Category,
  GET_BUDGETS,
  GET_CATEGORIES,
  GetBudgets,
  GetCategories,
  Group
} from '../types/budget';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axios';

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
        id: string;
        name: string;
        groupId?: string;
      }[];
    }[];
  };

  const [groups, categories] = budgetData.groups.reduce(
    (acc, group) => {
      const cs = group.categories.map(c => ({
        ...c,
        groupId: group.id
      }));

      acc[0].push({ budgetId, id: group.id, name: group.name });
      acc[1].push(...cs);

      return acc;
    },
    [[] as Group[], [] as Category[]]
  );

  dispatch({
    type: GET_CATEGORIES,
    payload: {
      categories,
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
