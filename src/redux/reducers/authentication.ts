import { AuthenticationActions, LOGIN, LOGOUT } from '../types/authentication';

export const defaultState = {
  loggedIn: false,
  expiresAt: new Date(),
  accessToken: '',
  refreshToken: ''
};

export default function authentication(
  state = defaultState,
  action: AuthenticationActions
): typeof defaultState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        expiresAt: action.payload.expiresAt,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };

    case LOGOUT:
      return { ...defaultState };

    default:
      return state;
  }
}
