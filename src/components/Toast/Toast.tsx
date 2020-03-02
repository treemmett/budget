import React, { FC, createContext, useContext, useState } from 'react';
import X from '../../assets/icons/x.svg';
import cx from 'classnames';
import styles from './Toast.scss';
import uuid from '../../utils/uuid';

type AddToastFn = (toast: ToastOptions | string) => void;
type RemoveToastFn = (id: string) => void;
type ToastStatus = 'info' | 'error';

interface ToastOptions {
  status: ToastStatus;
  message: string;
  title?: string;
}

export interface ToastData extends ToastOptions {
  id: string;
}

export interface UseToasts {
  addToast: AddToastFn;
  removeToast: RemoveToastFn;
}

const ToastContext = createContext<UseToasts>(null);

export const Toaster: FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([
    { message: 'hi', id: 'f', status: 'error', title: 'My Title' }
  ]);

  const addToast: AddToastFn = function addToast(toast) {
    if (typeof toast === 'string') {
      setToasts(t => [...t, { message: toast, id: uuid(), status: 'info' }]);
    } else {
      setToasts(t => [...t, { ...toast, id: uuid() }]);
    }
  };

  const removeToast: RemoveToastFn = function removeToast(id) {
    setToasts(t => t.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div className={styles.toaster}>
        {toasts.map(t => (
          <div
            className={cx(styles.toast, {
              [styles.error]: t.status === 'error'
            })}
            key={t.id}
          >
            {t.title && <div className={styles.title}>{t.title}</div>}
            <div className={styles.message}>{t.message}</div>
            <button
              className={styles.close}
              type="button"
              onClick={() => removeToast(t.id)}
            >
              <X />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToasts = (): UseToasts => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error(
      '`useToasts` can only be called from a descendant of `Toaster`'
    );
  }

  return {
    addToast: ctx.addToast,
    removeToast: ctx.removeToast
  };
};
