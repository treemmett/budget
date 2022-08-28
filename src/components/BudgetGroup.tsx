import React, { FC, useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styles from '../pages/budget.module.scss';
import BudgetCategory from './BudgetCategory';
import Loader from './Loader/Loader';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import { createCategory } from '@lib/category';
import { getGroups } from '@lib/groups';

interface BudgetGroupProps {
  id: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ id }: BudgetGroupProps) => {
  const { data, isError, isLoading } = useQuery(['groups'], getGroups);
  const [inputVisible, setInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createCategory, {
    onSuccess: (d) => {
      queryClient.invalidateQueries(['groups']);
      queryClient.setQueryData(['category', { id: d.id }], d);
    },
  });

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

  const group = useMemo(() => data?.find((g) => g.id === id), [data, id]);

  if (isLoading) {
    return (
      <div className={styles.group}>
        <Loader />
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className={styles.group}>
        <div>Error ocurred</div>
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <div className={styles.head}>
        <div className={styles.name}>{group.name}</div>
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
        {group.categories.map((c) => (
          <BudgetCategory key={c.id} name={c.name} />
        ))}
      </div>
    </div>
  );
};

export default BudgetGroup;
