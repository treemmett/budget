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
