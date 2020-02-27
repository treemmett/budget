import React, { FC } from 'react';
import styles from './Fab.scss';

interface FabProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Fab: FC<FabProps> = ({ children, onClick }) => {
  return (
    <button className={styles.fab} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Fab;
