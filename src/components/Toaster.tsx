import React from 'react';
import X from './icons/X';
import styles from './Toaster.module.scss';

const Toaster: React.FC = () => {
  function action(): void {
    // eslint-disable-next-line no-console
    console.log('foo');
  }
  return (
    <div className={styles.toaster}>
      <div className={styles.toast}>
        <div className={styles.title}>Some Title</div>
        <div className={styles.message}>Some Message</div>
        <div className={styles.buttons}>
          <button className={styles.button} type="button" onClick={action}>
            Console
          </button>
        </div>
        <button className={styles.close}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default Toaster;
