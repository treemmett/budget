import { FC } from 'react';
import { useQuery } from 'react-query';
import BudgetGroup from '../components/BudgetGroup';
import { useDispatch, useStore } from '../components/Store';
import Chevron from '../components/icons/Chevron';
import styles from './budget.module.scss';
import Loader from '@components/Loader/Loader';
import { getGroups } from '@lib/getGroups';

const Budget: FC = () => {
  const dispatch = useDispatch();
  const { month, year } = useStore();
  const { data, error, isError, isLoading } = useQuery('groups', getGroups);

  if (isLoading || !data) {
    return <Loader />;
  }

  if (isError) {
    console.log(error);
    return <div>Something went wrong</div>;
  }

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
      <div className={styles['budget-list']}>
        {data.map((group) => (
          <BudgetGroup id={group.id} key={group.id} name={group.name} />
        ))}
      </div>
    </div>
  );
};

export default Budget;
