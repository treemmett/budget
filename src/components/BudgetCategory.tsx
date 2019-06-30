import React, { FC, SyntheticEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DragHandle from './icons/DragHandle';
import { Draggable } from 'react-beautiful-dnd';
import MoneyInput from './MoneyInput';
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

  const amount = useMemo(() => {
    const allocated = allocations.find(
      a => a.categoryId === id && a.month === month && a.year === year
    );

    return allocated ? allocated.amount : '0.00';
  }, [allocations, id, month, year]);

  function onChange(e: SyntheticEvent): void {
    dispatch(
      allocateFunds(
        budgetId,
        id,
        (e.target as HTMLInputElement).value,
        month,
        year
      )
    );
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
          <MoneyInput
            className={styles['category-allocation']}
            value={amount}
            onChange={onChange}
          />
        </div>
      )}
    </Draggable>
  );
};

export default BudgetCategory;
