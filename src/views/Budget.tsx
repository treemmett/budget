import { FC } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import BudgetGroup from '../components/BudgetGroup';
import Chevron from '../components/icons/Chevron';
import styles from './Budget.module.scss';

const Budget: FC = () => {
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
  }

  return (
    <div className={styles.view}>
      <div className={styles['page-header']}>
        <div className={styles['budget-title']}>Budget</div>
        <div className={styles.date}>
          <button
            className={styles.prev}
            onClick={() => {}}
          >
            <Chevron />
          </button>
          <div className={styles.text}>
            {
              [
                'January',
                'February',
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
              ][3]
            }
            2022
          </div>
          <button
            className={styles.next}
            onClick={() => {}}
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
                <BudgetGroup id="g.id" index={0} name="Housing" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Budget;
