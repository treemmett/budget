import { FC } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BudgetGroup from '../components/BudgetGroup';
import { useDispatch, useStore } from '../components/Store';
import Chevron from '../components/icons/Chevron';
import styles from './budget.module.scss';

const Budget: FC = () => {
  const dispatch = useDispatch();
  const { month, year } = useStore();

  return (
    <div className={styles.view}>
      <div className={styles['page-header']}>
        <div className={styles['budget-title']}>Budget</div>
        <div className={styles.date}>
          <button
            className={styles.prev}
            onClick={() => dispatch({ direction: -1, type: 'CHANGE_MONTH' })}
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
                'December',
              ][month]
            }{' '}
            {year}
          </div>
          <button
            className={styles.next}
            onClick={() => dispatch({ direction: 1, type: 'CHANGE_MONTH' })}
          >
            <Chevron />
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={() => null}>
        <Droppable droppableId="budget" type="group">
          {(provided) => (
            <div
              className={styles['budget-list']}
              // eslint-disable-next-line react/jsx-props-no-spreading
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
