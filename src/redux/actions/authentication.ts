import { ThunkAction } from 'redux-thunk';
import { State } from '../store';
import { Login, Logout, LOGIN, LOGOUT } from '../types/authentication';
import axios from '../../utils/axios';

export const login = (
  username: string,
  password: string
): ThunkAction<Promise<void>, State, null, Login> => async dispatch => {
  const { data } = await axios({
    method: 'POST',
    url: '/auth',
    data: {
      email: username.trim().toLowerCase(),
      password: password.trim()
    }
  });

  dispatch({
    type: LOGIN,
    payload: {
      accessToken: data.accessToken,
      expiresAt: new Date(Date.now() + data.expiresIn * 1000),
      refreshToken: data.refreshToken
    }
  });
};

export const logout = (): ThunkAction<
  Promise<void>,
  State,
  null,
  Logout
> => async dispatch => {
  await axios({
    method: 'DELETE',
    url: '/auth'
  });

  dispatch({
    type: LOGOUT
  });
};
