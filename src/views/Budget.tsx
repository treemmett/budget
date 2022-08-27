import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useMemo } from 'react';
import {
  changeCategoryPosition,
  changeDate,
  changeGroupPosition,
  getBudgets,
  getTransactions
} from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import BudgetGroup from '../components/BudgetGroup';
import Chevron from '../components/icons/Chevron';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const allGroups = useSelector((state: State) => state.budget.groups);
  const transactions = useSelector((state: State) => state.budget.transactions);
  const month = useSelector((state: State) => state.budget.month);
  const year = useSelector((state: State) => state.budget.year);

  const groups = useMemo(
    () =>
      allGroups
        .filter(g => g.budgetId === budgetId)
        .sort((a, b) => {
          if (a.sort > b.sort) return 1;
          if (a.sort < b.sort) return -1;
          return 0;
        }),
    [budgetId, allGroups]
  );

  useEffect(() => {
    if (!budgetId) {
      dispatch(getBudgets());
    }

    if (!transactions.length && budgetId) {
      dispatch(getTransactions(budgetId));
    }
  }, [dispatch, transactions, budgetId]);

  function onDragEnd(result: DropResult): void {
    const { destination, draggableId, source } = result;
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'category') {
      dispatch(
        changeCategoryPosition(
          draggableId,
          destination.droppableId,
          destination.index
        )
      );
    } else if (result.type === 'group') {
      dispatch(changeGroupPosition(draggableId, destination.index));
    }
  }

  return (
    <div className={styles.view}>
      <div className={styles['page-header']}>
        <div className={styles['budget-title']}>Budget</div>
        <div className={styles.date}>
          <button
            className={styles.prev}
            onClick={() => dispatch(changeDate(-1))}
          >
            <Chevron />
          </button>
          <div className={styles.text}>
            {
              [
                'January',
                'Febuary',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ][month]
            }{' '}
            {year}
          </div>
          <button
            className={styles.next}
            onClick={() => dispatch(changeDate(1))}
          >
            <Chevron />
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="budget" type="group">
          {provided => (
            <div
              className={styles['budget-list']}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {groups.map((g, i) => (
                <BudgetGroup key={g.id} id={g.id} index={i} name={g.name} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Budget;
