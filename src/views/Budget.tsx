import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useMemo } from 'react';
import {
  changeCategoryPosition,
  changeGroupPosition,
  getBudgets
} from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import BudgetGroup from '../components/BudgetGroup';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const allGroups = useSelector((state: State) => state.budget.groups);

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
  );
};

export default Budget;
