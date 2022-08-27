import Plus from './icons/Plus';
import React from 'react';
import styles from './Fab.module.scss';

interface FabProps {
  onClick?: (e: React.SyntheticEvent) => any;
}

const Fab: React.FC<FabProps> = ({ onClick }: FabProps) => (
  <button className={styles.fab} onClick={onClick}>
    <Plus />
  </button>
);

export default Fab;
