import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import { getBudgets } from '../redux/actions/budget';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((state: State) => state.budget.budgets);

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  return (
    <div className={styles['budget-list']}>
      {budgets.map(b => (
        <div key={b.id} className={styles.budget}>
          {b.name}
        </div>
      ))}
    </div>
  );
};

export default Budget;
