import React, { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import formatCurrency, { parseCurrency } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import DragHandle from './icons/DragHandle';
import { Draggable } from 'react-beautiful-dnd';
import { State } from '../redux/store';
import { allocateFunds } from '../redux/actions/budget';
import cx from 'classnames';
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
  const month = useSelector((state: State) => state.budget.month);
  const year = useSelector((state: State) => state.budget.year);
  const [value, setValue] = useState('');
  const transactions = useSelector((state: State) => state.budget.transactions);

  const activity = useMemo(() => {
    const transactionsToCount = transactions.filter(
      t =>
        t.categoryId === id &&
        t.date.startsWith(`${year}-${`0${month + 1}`.slice(-2)}`)
    );

    const count = transactionsToCount.reduce((acc, cur) => {
      // multiply amounts by 100 to handle floats
      const amount = cur.amount * 100;

      return acc + amount;
    }, 0);

    return count / 100;
  }, [transactions, id, year, month]);

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
    <Draggable draggableId={id} index={index} type="category">
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
            className={cx(styles.activity, {
              [styles['with-value']]: activity !== 0,
              [styles.positive]: activity > 0,
              [styles.negative]: activity < 0
            })}
          >
            {formatCurrency(activity)}
          </div>
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
