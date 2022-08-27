import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import formatCurrency, { toDisplay } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import DragHandle from './icons/DragHandle';
import { Draggable } from 'react-beautiful-dnd';
import { allocateFunds } from '../redux/actions/budget';
import cx from 'classnames';
import styles from '../pages/budget.module.scss';

interface BudgetCategoryProps {
  id: string;
  name: string;
  index: number;
}

const BudgetCategory: FC<BudgetCategoryProps> = ({
  id,
  name,
  index
}: BudgetCategoryProps) => {
  const [value, setValue] = useState('');

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          className={styles.category}
          ref={provided.innerRef}
        >
          <div {...provided.dragHandleProps} className={styles['drag-handle']}>
            <DragHandle />
          </div>
          <div className={styles.name}>{name}</div>
          <div
            className={cx(styles.activity)}
          >
            {toDisplay(500)}
          </div>
          <input
            className={styles['category-allocation']}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BudgetCategory;
