import {
  DISMISS_TOAST,
  SEND_TOAST,
  Toast,
  ToastActions
} from '../types/toaster';

export default function toaster(
  state = [] as Toast[],
  action: ToastActions
): Toast[] {
  switch (action.type) {
    case DISMISS_TOAST:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];

    case SEND_TOAST:
      return [...state, action.payload];

    default:
      return state;
  }
}
