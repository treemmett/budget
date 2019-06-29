import { LOGIN, LOGOUT, Login, Logout } from '../types/authentication';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
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

  const payload = {
    accessToken: data.accessToken,
    expiresAt: new Date(Date.now() + data.expiresIn * 1000),
    refreshToken: data.refreshToken
  };

  localStorage.setItem('session', JSON.stringify(payload));

  dispatch({
    type: LOGIN,
    payload
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

export const register = (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): ThunkAction<Promise<void>, State, null, Login> => async dispatch => {
  await axios({
    method: 'POST',
    url: '/user',
    data: {
      email: username,
      password,
      firstName,
      lastName
    }
  });

  dispatch(login(username, password));
};
