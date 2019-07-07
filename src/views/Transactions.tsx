import {
  FixedSizeList as List,
  ListChildComponentProps,
  areEqual
} from 'react-window';
import React, { useEffect, useState } from 'react';
import TextField, { SplitInputs } from '../components/TextField';
import {
  addTransaction,
  getBudgets,
  getTransactions
} from '../redux/actions/budget';
import { animated, useTransition } from 'react-spring';
import formatCurrency, { parseCurrency } from '../utils/formatCurrency';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import Btn from '../components/Btn';
import { Category } from '../redux/types/budget';
import DateField from '../components/DateField';
import Fab from '../components/Fab';
import Radio from '../components/Radio';
import { RouteComponentProps } from '@reach/router';
import SelectField from '../components/SelectField';
import { State } from '../redux/store';
import styles from './Transactions.module.scss';

const Transactions: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const budget = useSelector((state: State) => state.budget.selectedBudget);
  const transactions = useSelector((state: State) => state.budget.transactions);
  const categories = useSelector((state: State) => state.budget.categories);
  const groups = useSelector((state: State) => state.budget.groups);
  const menuTransition = useTransition(showForm, null, {
    from: {
      transform: 'translateX(100%)'
    },
    enter: {
      transform: 'translateX(0%)'
    },
    leave: {
      transform: 'translateX(100%)'
    },
    config: {
      tension: 270,
      friction: 30
    }
  });
  const shadowTransition = useTransition(showForm, null, {
    from: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    enter: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    leave: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    config: {
      tension: 270,
      friction: 30
    }
  });

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

    const { description, date, amount, category, type } = (e.currentTarget
      .elements as unknown) as { [key: string]: HTMLInputElement };

    await dispatch(
      addTransaction(
        description.value,
        date.value,
        parseCurrency(amount.value) * (type.value === 'expense' ? 1 : -1),
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
      {shadowTransition.map(
        ({ item, key, props }) =>
          item && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <animated.div
              key={key}
              style={props}
              className={styles.shadow}
              onClick={() => setShowForm(false)}
            >
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              {menuTransition.map(
                menuTran =>
                  menuTran.item && (
                    <animated.div
                      key={menuTran.key}
                      style={menuTran.props}
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
                        <TextField
                          label="Amount"
                          name="amount"
                          mask={formatCurrency}
                          required
                        />
                        <SelectField
                          label="Category"
                          name="category"
                          options={categories
                            .sort((a, b) => {
                              if (a.sort > b.sort) return 1;
                              if (a.sort < b.sort) return -1;
                              return 0;
                            })
                            .map(c => ({
                              label: c.name,
                              value: c.id,
                              group: c.groupId
                            }))}
                          groups={groups
                            .sort((a, b) => {
                              if (a.sort > b.sort) return 1;
                              if (a.sort < b.sort) return -1;
                              return 0;
                            })
                            .map(g => ({ id: g.id, label: g.name }))}
                          required
                        />
                        <SplitInputs>
                          <Radio
                            defaultChecked
                            name="type"
                            label="Expense"
                            value="expense"
                          />
                          <Radio name="type" label="Income" value="income" />
                        </SplitInputs>
                        <Btn label="Save Transaction" type="submit" />
                      </form>
                    </animated.div>
                  )
              )}
            </animated.div>
          )
      )}
      <Fab onClick={() => setShowForm(true)} />
    </div>
  );
};

export default Transactions;
