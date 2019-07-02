import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BudgetCategory from './BudgetCategory';
import { Droppable } from 'react-beautiful-dnd';
import Plus from './icons/Plus';
import { State } from '../redux/store';
import { addCategory } from '../redux/actions/budget';
import styles from '../views/Budget.module.scss';

interface BudgetGroupProps {
  id: string;
  name: string;
}

const BudgetGroup: FC<BudgetGroupProps> = ({ id, name }: BudgetGroupProps) => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state: State) => state.budget.categories);
  const [inputVisible, setInput] = useState(false);

  const categories = useMemo(
    () =>
      allCategories
        .filter(c => c.groupId === id)
        .sort((a, b) => {
          if (a.sort > b.sort) return 1;
          if (a.sort < b.sort) return -1;
          return 0;
        }),
    [id, allCategories]
  );

  function createCategory(e: React.KeyboardEvent): void {
    if (e.keyCode !== 13) {
      return;
    }

    const input = e.currentTarget as HTMLInputElement;

    dispatch(addCategory(input.value, id));

    setInput(false);
  }

  return (
    <div className={styles.group}>
      <div className={styles.head}>
        <div className={styles['group-name']}>
          {name}
          <button
            className={styles.add}
            type="button"
            onClick={() => setInput(true)}
          >
            <Plus />
          </button>
        </div>
        <div className={styles.allocation}>Allocated</div>
        {inputVisible && (
          <div className={styles['category-input']}>
            <input
              autoFocus
              onBlur={() => setInput(false)}
              placeholder="New Category Name"
              onKeyDown={createCategory}
            />
          </div>
        )}
      </div>
      <div className={styles.border} />

      <Droppable droppableId={id}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles['category-list']}
          >
            {categories.map((c, index) => (
              <BudgetCategory
                key={c.id}
                id={c.id}
                name={c.name}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BudgetGroup;
