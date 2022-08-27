import '../utils/popToast';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { State } from '../redux/store';
import { Toast as ToastType } from '../redux/types/toaster';
import X from './icons/X';
import { dismissToast } from '../redux/actions/toaster';
import styles from './Toaster.module.scss';

const Toast: React.FC<{ toast: ToastType }> = ({
  toast
}: {
  toast: ToastType;
}) => {
  const dispatch = useDispatch();

  function dismiss(): void {
    dispatch(dismissToast(toast.id));
  }

  return (
    <div className={styles.toast}>
      {toast.title ? <div className={styles.title}>{toast.title}</div> : null}
      <div className={styles.message}>{toast.message}</div>
      {toast.actions ? (
        <div className={styles.buttons}>
          {toast.actions.map(action => (
            <button
              className={styles.button}
              type="button"
              onClick={action.action}
              key={action.id}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
      <button className={styles.close} onClick={dismiss}>
        <X />
      </button>
    </div>
  );
};

const Toaster: React.FC = () => {
  const toasts = useSelector((state: State) => state.toasts);

  return (
    <div className={styles.toaster}>
      {toasts.map(t => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
};

export default Toaster;
