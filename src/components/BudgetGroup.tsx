import React, { FC, useState } from 'react';
import styles from '../pages/budget.module.scss';
import BudgetCategory from './BudgetCategory';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import type Category from '@entities/Category';

interface BudgetGroupProps {
  name: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ name }: BudgetGroupProps) => {
  const [inputVisible, setInput] = useState(false);

  const categories: Partial<Category>[] = [
    {
      id: 'a',
      name: 'Rent',
    },
    {
      id: 'b',
      name: 'Electric',
    },
  ];

  function createCategory(e: React.KeyboardEvent): void {
    if (e.keyCode !== 13) {
      return;
    }

    setInput(false);
  }

  return (
    <div className={styles.group}>
      <div className={styles.head}>
        <div className={styles.name}>{name}</div>
        <button className={styles.add} onClick={() => setInput(true)} type="button">
          <Plus />
        </button>
        <div className={styles.activity}>Activity</div>
        <div className={styles.allocation}>Allocated</div>
        {inputVisible && (
          <div className={styles['category-input']}>
            <input
              onBlur={() => setInput(false)}
              onKeyDown={createCategory}
              placeholder="New Category Name"
            />
          </div>
        )}
        <div className={styles['drag-handle']}>
          <DragHandle />
        </div>
      </div>
      <div className={styles.border} />

      <div className={styles['category-list']} suppressHydrationWarning>
        {categories.map((c) => (
          <BudgetCategory key={c.id} name={c.name || 'oh well'} />
        ))}
      </div>
    </div>
  );
};

export default BudgetGroup;
