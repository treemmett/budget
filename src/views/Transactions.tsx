import React, { useEffect } from 'react';
import { getBudgets, getTransactions } from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import styles from './Transactions.module.scss';

const Transactions: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budget = useSelector((state: State) => state.budget.selectedBudget);
  const transactions = useSelector((state: State) => state.budget.transactions);

  useEffect(() => {
    if (budget) {
      dispatch(getTransactions(budget));
    } else {
      dispatch(getBudgets());
    }
  }, [budget]);

  return (
    <div className={styles.transactions}>
      {transactions.map(t => (
        <div key={t.id}>
          {t.amount} {t.description}
        </div>
      ))}
    </div>
  );
};

export default Transactions;
