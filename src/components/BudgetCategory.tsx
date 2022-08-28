import cx from 'classnames';
import React, { FC } from 'react';
import styles from '../pages/budget.module.scss';
import { toDisplay } from '../utils/formatCurrency';
import DragHandle from './icons/DragHandle';

interface BudgetCategoryProps {
  name: string;
}

const BudgetCategory: FC<BudgetCategoryProps> = ({ name }: BudgetCategoryProps) => (
  <div className={styles.category} suppressHydrationWarning>
    <div className={styles['drag-handle']} suppressHydrationWarning>
      <DragHandle />
    </div>
    <div className={styles.name}>{name}</div>
    <div className={cx(styles.activity)}>{toDisplay(500)}</div>
    <input className={styles['category-allocation']} />
  </div>
);

export default BudgetCategory;
