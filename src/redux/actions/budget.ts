/* eslint-disable import/prefer-default-export */
import { GET_BUDGETS, GetBudgets } from '../types/budget';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
import axios from '../../utils/axios';

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
};
