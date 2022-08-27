export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface Login {
  type: typeof LOGIN;
  payload: {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
  };
}

export interface Logout {
  type: typeof LOGOUT;
}

export type AuthenticationActions = Login | Logout;
