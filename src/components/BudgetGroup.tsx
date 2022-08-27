import { Draggable, Droppable } from 'react-beautiful-dnd';
import React, { FC, useState } from 'react';
import BudgetCategory from './BudgetCategory';
import DragHandle from './icons/DragHandle';
import Plus from './icons/Plus';
import styles from '../pages/budget.module.scss';
import { Category } from '../redux/types/budget';

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
  const [inputVisible, setInput] = useState(false);

  const categories: Category[] = [
    {
      id: 'a',
      name: 'Rent',
      sort: 0,
      groupId: 'a'
    },
    {
      id: 'a',
      name: 'Electric',
      sort: 0,
      groupId: 'a'
    },
  ]

  function createCategory(e: React.KeyboardEvent): void {
    if (e.keyCode !== 13) {
      return;
    }

    setInput(false);
  }

  return (
    <Draggable draggableId={id} index={index}>
      {groupProvided => (
        <div
          className={styles.group}
          {...groupProvided.draggableProps}
          ref={groupProvided.innerRef}
        >
          <div className={styles.head}>
            <div className={styles.name}>{name}</div>
            <button
              className={styles.add}
              type="button"
              onClick={() => setInput(true)}
            >
              <Plus />
            </button>
            <div className={styles.activity}>Activity</div>
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
