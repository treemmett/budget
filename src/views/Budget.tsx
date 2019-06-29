import React, { SyntheticEvent, useEffect } from 'react';
import { allocateFunds as allocate, getBudgets } from '../redux/actions/budget';
import { useDispatch, useSelector } from 'react-redux';
import MoneyInput from '../components/MoneyInput';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const groups = useSelector((state: State) => state.budget.groups);
  const categories = useSelector((state: State) => state.budget.categories);
  const categoryAllocations = useSelector(
    (state: State) => state.budget.categoryAllocation
  );
  const date = new Date();

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  function allocateFunds(categoryId: string, amount: string): void {
    dispatch(
      allocate(
        budgetId,
        categoryId,
        amount,
        date.getMonth(),
        date.getFullYear()
      )
    );
  }

  return (
    <div className={styles['budget-list']}>
      {groups
        .filter(g => g.budgetId === budgetId)
        .map(g => (
          <div key={g.id} className={styles.group}>
            <div className={styles.head}>
              <div className={styles['group-name']}>{g.name}</div>
              <div className={styles.allocation}>Allocated</div>
            </div>
            <div className={styles.border} />
            <div className={styles['category-list']}>
              {categories
                .filter(c => c.groupId === g.id)
                .map(c => {
                  const allocated = categoryAllocations.find(
                    a =>
                      a.categoryId === c.id &&
                      a.month === date.getMonth() &&
                      a.year === date.getFullYear()
                  );

                  return (
                    <div key={c.id} className={styles.category}>
                      <div className={styles['category-name']}>{c.name}</div>
                      <MoneyInput
                        className={styles['category-allocation']}
                        value={allocated ? allocated.amount : '0.00'}
                        onInput={(e: SyntheticEvent) =>
                          allocateFunds(
                            c.id,
                            (e.target as HTMLInputElement).value
                          )
                        }
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Budget;
