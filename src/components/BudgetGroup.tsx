import React, { FC, useMemo } from 'react';
import BudgetCategory from './BudgetCategory';
import { State } from '../redux/store';
import styles from '../views/Budget.module.scss';
import { useSelector } from 'react-redux';

interface BudgetGroupProps {
  id: string;
  name: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ id, name }: BudgetGroupProps) => {
  const allCategories = useSelector((state: State) => state.budget.categories);

  const categories = useMemo(
    () => allCategories.filter(c => c.groupId === id),
    [id, allCategories]
  );

  return (
    <div className={styles.group}>
      <div className={styles.head}>
        <div className={styles['group-name']}>{name}</div>
        <div className={styles.allocation}>Allocated</div>
      </div>
      <div className={styles.border} />
      <div className={styles['category-list']}>
        {categories.map(c => (
          <BudgetCategory key={c.id} id={c.id} name={c.name} />
        ))}
      </div>
    </div>
  );
};

export default BudgetGroup;
