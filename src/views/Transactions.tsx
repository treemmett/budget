import React, { useEffect, useState } from 'react';
import { getBudgets, getTransactions } from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../components/Btn';
import DateField from '../components/DateField';
import Fab from '../components/Fab';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import TextField from '../components/TextField';
import styles from './Transactions.module.scss';

const Transactions: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(true);
  const budget = useSelector((state: State) => state.budget.selectedBudget);
  const transactions = useSelector((state: State) => state.budget.transactions);

  useEffect(() => {
    if (budget) {
      dispatch(getTransactions(budget));
    } else {
      dispatch(getBudgets());
    }
  }, [budget, dispatch]);

  return (
    <div className={styles.transactions}>
      {showForm && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={styles.shadow} onClick={() => setShowForm(false)}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={styles.form}
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
          >
            <form>
              <TextField
                label="Description"
                name="description"
                required
                autoFocus
              />
              <DateField label="Date" name="date" required />
              <TextField label="Amount" name="amount" required />
              <TextField label="Category" name="category" required />
              <Btn label="Save Category" type="submit" />
            </form>
          </div>
        </div>
      )}
      {transactions.map(t => (
        <div key={t.id}>
          {t.amount} {t.description}
        </div>
      ))}
      <Fab onClick={() => setShowForm(true)} />
    </div>
  );
};

export default Transactions;
