import {
  DISMISS_TOAST,
  DismissToast,
  SEND_TOAST,
  SendToast,
  ToastDetails
} from '../types/toaster';
import { State } from '../store';
import { ThunkAction } from 'redux-thunk';
import randomString from '../../utils/randomString';

export const dismissToast = (
  id: string
): ThunkAction<void, State, null, DismissToast> => (dispatch, getState) => {
  const { toasts } = getState();

  const index = toasts.findIndex(t => t.id === id);

  dispatch({
    type: DISMISS_TOAST,
    payload: index
  });
};

export const sendToast = ({
  message,
  title,
  actions
}: ToastDetails): ThunkAction<void, State, null, SendToast> => dispatch => {
  dispatch({
    type: SEND_TOAST,
    payload: {
      message,
      title,
      actions: actions
        ? actions.map(action => ({ ...action, id: randomString() }))
        : undefined,
      id: randomString()
    }
  });
};
