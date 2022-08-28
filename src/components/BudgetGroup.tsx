import React, { FC, useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import styles from '../pages/budget.module.scss';
import BudgetCategory from './BudgetCategory';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import type Category from '@entities/Category';
import { createCategory } from '@lib/createCategory';

interface BudgetGroupProps {
  id: string;
  name: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ id, name }: BudgetGroupProps) => {
  const [inputVisible, setInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { mutate } = useMutation(createCategory);

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

  const keyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Enter') {
        return;
      }

      setInput(false);
      mutate({ groupID: id, name: newCategoryName });
      setNewCategoryName('');
    },
    [id, mutate, newCategoryName]
  );

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
              onChange={(e) => setNewCategoryName(e.currentTarget.value)}
              onKeyDown={keyDown}
              placeholder="New Category Name"
              value={newCategoryName}
              autoFocus
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
