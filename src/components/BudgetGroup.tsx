import React, { FC, useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styles from '../pages/budget.module.scss';
import BudgetCategory from './BudgetCategory';
import Loader from './Loader/Loader';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import { createCategory, createCategoryKey } from '@lib/category';
import { createGroupsKey, getGroupByID } from '@lib/groups';

interface BudgetGroupProps {
  id: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ id }: BudgetGroupProps) => {
  const { data, isError, isLoading } = useQuery(createGroupsKey(id), () => getGroupByID(id));
  const [inputVisible, setInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createCategory, {
    onSuccess: (d) => {
      queryClient.invalidateQueries(createGroupsKey(id));
      queryClient.setQueryData(createCategoryKey(d.id), d);
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

  if (isLoading || (!isError && !data)) {
    return (
      <div className={styles.group}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.group}>
        <div>Error ocurred</div>
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <div className={styles.head}>
        <div className={styles.name}>{data.name}</div>
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
        {data.categories.map((c) => (
          <BudgetCategory id={c.id} key={c.id} />
        ))}
      </div>
    </div>
  );
};

export default BudgetGroup;
