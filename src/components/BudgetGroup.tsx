import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BudgetCategory from './BudgetCategory';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import { State } from '../redux/store';
import { addCategory } from '../redux/actions/budget';
import styles from '../views/Budget.module.scss';

interface BudgetGroupProps {
  id: string;
  name: string;
  index: number;
}

const BudgetGroup: FC<BudgetGroupProps> = ({
  id,
  name,
  index
}: BudgetGroupProps) => {
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
    <Draggable draggableId={id} index={index} type="group">
      {groupProvided => (
        <div
          className={styles.group}
          {...groupProvided.draggableProps}
          ref={groupProvided.innerRef}
        >
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
            <div
              {...groupProvided.dragHandleProps}
              className={styles['drag-handle']}
            >
              <DragHandle />
            </div>
          </div>
          <div className={styles.border} />

          <Droppable droppableId={id} type="category">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles['category-list']}
              >
                {categories.map((c, i) => (
                  <BudgetCategory
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    index={i}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default BudgetGroup;
