import {
  FixedSizeList as List,
  ListChildComponentProps,
  areEqual
} from 'react-window';
import React, { useEffect, useState } from 'react';
import {
  addTransaction,
  getBudgets,
  getTransactions
} from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import Btn from '../components/Btn';
import { Category } from '../redux/types/budget';
import DateField from '../components/DateField';
import Fab from '../components/Fab';
import { RouteComponentProps } from '@reach/router';
import SelectField from '../components/SelectField';
import { State } from '../redux/store';
import TextField from '../components/TextField';
import styles from './Transactions.module.scss';

const Transactions: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const budget = useSelector((state: State) => state.budget.selectedBudget);
  const transactions = useSelector((state: State) => state.budget.transactions);
  const categories = useSelector((state: State) => state.budget.categories);

  useEffect(() => {
    if (budget) {
      dispatch(getTransactions(budget));
    } else {
      dispatch(getBudgets());
    }
  }, [budget, dispatch]);

  async function saveTransaction(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const { description, date, amount, category } = (e.currentTarget
      .elements as unknown) as { [key: string]: HTMLInputElement };

    await dispatch(
      addTransaction(
        description.value,
        date.value,
        Number(amount.value.replace(/[?!.]\D/g, '')),
        category.value
      )
    );

    setShowForm(false);
  }

  const Row = React.memo<ListChildComponentProps>(
    ({ style, index }: ListChildComponentProps) => {
      const transaction = transactions[index];
      const category = categories.find(
        c => c.id === transaction.categoryId
      ) as Category;

      return (
        <div style={style} className={styles['transaction-wrapper']}>
          <div className={styles.transaction}>
            {transaction.description} - {category.name}
          </div>
        </div>
      );
    },
    areEqual
  );

  return (
    <div className={styles.transactions}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={transactions.length}
            itemSize={67}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
      {showForm && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={styles.shadow} onClick={() => setShowForm(false)}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={styles.form}
            onClick={(e: React.SyntheticEvent) => e.stopPropagation()}
          >
            <form onSubmit={saveTransaction}>
              <TextField
                label="Description"
                name="description"
                required
                autoFocus
              />
              <DateField label="Date" name="date" required />
              <TextField label="Amount" name="amount" required />
              <SelectField
                label="Category"
                name="category"
                options={categories.map(c => ({ label: c.name, value: c.id }))}
                required
              />
              <Btn label="Save Transaction" type="submit" />
            </form>
          </div>
        </div>
      )}
      <Fab onClick={() => setShowForm(true)} />
    </div>
  );
};

export default Transactions;
