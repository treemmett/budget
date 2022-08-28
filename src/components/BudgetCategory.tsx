import cx from 'classnames';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import styles from '../pages/budget.module.scss';
import { toDisplay } from '../utils/formatCurrency';
import Loader from './Loader/Loader';
import DragHandle from './icons/DragHandle';
import { createCategoryKey, getCategoryByID } from '@lib/category';

interface BudgetCategoryProps {
  id: string;
}

const BudgetCategory: FC<BudgetCategoryProps> = ({ id }: BudgetCategoryProps) => {
  const { data, isError, isLoading } = useQuery(createCategoryKey(id), () => getCategoryByID(id));

  if (isLoading || (!isError && !data)) {
    return (
      <div className={styles.category}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.category}>
        <div>An error occurred</div>
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <div className={styles['drag-handle']}>
        <DragHandle />
      </div>
      <div className={styles.name}>{data.name}</div>
      <div className={cx(styles.activity)}>{toDisplay(500)}</div>
      <input className={styles['category-allocation']} />
    </div>
  );
};

export default BudgetCategory;
