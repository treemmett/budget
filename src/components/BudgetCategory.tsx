import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import formatCurrency, { parseCurrency } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import DragHandle from './icons/DragHandle';
import { Draggable } from 'react-beautiful-dnd';
import { State } from '../redux/store';
import { allocateFunds } from '../redux/actions/budget';
import styles from '../views/Budget.module.scss';

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
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const allocations = useSelector(
    (state: State) => state.budget.categoryAllocation
  );
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const [value, setValue] = useState('');

  useEffect(() => {
    const allocated = allocations.find(
      a => a.categoryId === id && a.month === month && a.year === year
    );

    if (allocated) {
      setValue(allocated.amount.toString());
    } else {
      setValue('0.00');
    }
  }, [allocations, id, month, year]);

  function onChange(e: SyntheticEvent<HTMLInputElement>): void {
    const formatted = formatCurrency((e.target as HTMLInputElement).value);
    setValue(formatted);

    const parsed = parseCurrency(formatted);
    dispatch(allocateFunds(budgetId, id, parsed, month, year));
  }

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
          <div className={styles['category-name']}>{name}</div>
          <input
            className={styles['category-allocation']}
            value={formatCurrency(value)}
            onChange={onChange}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BudgetCategory;
