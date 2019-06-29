export const DISMISS_TOAST = 'DISMISS_TOAST';
export const SEND_TOAST = 'SEND_TOAST';

export interface ToastActionDetails {
  label: string;
  action: (...args: any) => any;
}

export interface ToastAction extends ToastActionDetails {
  id: string;
}

export interface ToastDetails {
  actions?: ToastActionDetails[];
  message: string;
  title?: string;
}

export interface Toast extends ToastDetails {
  actions?: ToastAction[];
  id: string;
}

export interface DismissToast {
  type: typeof DISMISS_TOAST;
  payload: number;
}

export interface SendToast {
  type: typeof SEND_TOAST;
  payload: Toast;
}

export type ToastActions = DismissToast | SendToast;
