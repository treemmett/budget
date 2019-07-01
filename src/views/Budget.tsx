import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React, { useEffect, useMemo } from 'react';
import { changeCategoryPosition, getBudgets } from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import BudgetGroup from '../components/BudgetGroup';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const groups = useSelector((state: State) => state.budget.groups);

  const budgetGroups = useMemo(
    () => groups.filter(g => g.budgetId === budgetId),
    [budgetId, groups]
  );

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

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

    dispatch(
      changeCategoryPosition(
        draggableId,
        destination.droppableId,
        destination.index
      )
    );
  }

  return (
    <div className={styles['budget-list']}>
      <DragDropContext onDragEnd={onDragEnd}>
        {budgetGroups.map(g => (
          <BudgetGroup key={g.id} id={g.id} name={g.name} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Budget;
