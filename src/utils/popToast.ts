import { ToastDetails } from '../redux/types/toaster';
import { sendToast } from '../redux/actions/toaster';
import store from '../redux/store';

const popToast = (toastDetails: string | ToastDetails): void => {
  const details: ToastDetails =
    typeof toastDetails === 'string' ? { message: toastDetails } : toastDetails;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store.dispatch<any>(sendToast(details));
};

// @ts-ignore
window.toast = popToast;

export default popToast;
