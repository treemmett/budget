import React, { FC, createContext, useContext, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import X from '../../assets/icons/x.svg';
import cx from 'classnames';
import styles from './Toast.scss';
import uuid from '../../utils/uuid';

type AddToastFn = (toast: ToastOptions | string) => string;
type RemoveToastFn = (id: string) => void;
type ToastStatus = 'info' | 'error';

interface ToastOptions {
  status?: ToastStatus;
  message: string;
  title?: string;
}

export interface ToastData extends ToastOptions {
  id: string;
  status: ToastStatus;
}

export interface UseToasts {
  addToast: AddToastFn;
  removeToast: RemoveToastFn;
}

export const ToastContext = createContext<UseToasts>(null);

export const Toaster: FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const transitions = useTransition(toasts, t => t.id, {
    enter: {
      height: '4.5rem',
      marginBottom: '1rem',
      opacity: 1,
      transform: 'translateY(0, 0)',
    },
    from: { opacity: 0, transform: 'translate(0, 50%)' },
    leave: {
      height: '0rem',
      marginBottom: '0rem',
      opacity: 0,
      transform: 'translate(100%, 0)',
    },
  });

  const removeToast: RemoveToastFn = function removeToast(id) {
    setToasts(t => t.filter(toast => toast.id !== id));
  };

  const addToast: AddToastFn = function addToast(toast) {
    const id = uuid();

    setToasts(t => [
      ...t,
      {
        id,
        message: typeof toast === 'string' ? toast : toast.message,
        status: typeof toast === 'string' ? 'info' : toast.status || 'info',
        title: typeof toast === 'string' ? null : toast.title,
      },
    ]);

    setTimeout(removeToast, 5500, id);

    return id;
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <div className={styles.toaster}>
        {transitions.map(({ item, props, key, state }) => (
          <animated.div
            className={cx(styles.toast, {
              [styles.error]: item.status === 'error',
            })}
            key={key}
            style={props}
          >
            {item.title && <div className={styles.title}>{item.title}</div>}
            <div className={styles.message}>{item.message}</div>
            <button
              className={cx(styles.close, {
                [styles.leaving]: state === 'leave',
              })}
              onClick={() => removeToast(item.id)}
              type="button"
            >
              <X />
            </button>
          </animated.div>
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
    removeToast: ctx.removeToast,
  };
};