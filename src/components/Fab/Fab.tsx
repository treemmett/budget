import React, { FC, PropsWithChildren } from 'react';
import styles from './Fab.module.scss';

interface FabProps extends PropsWithChildren {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Fab: FC<FabProps> = ({ children, onClick }) => (
  <button className={styles.fab} onClick={onClick} type="button">
    {children}
  </button>
);

export default Fab;
