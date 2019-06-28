import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import { getBudgets } from '../redux/actions/budget';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const groups = useSelector((state: State) => state.budget.groups);
  const categories = useSelector((state: State) => state.budget.categories);
  const categoryAllocations = useSelector(
    (state: State) => state.budget.categoryAllocation
  );

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  const date = new Date();

  return (
    <div className={styles['budget-list']}>
      {groups
        .filter(g => g.budgetId === budgetId)
        .map(g => (
          <div key={g.id} className={styles.group}>
            <div className={styles.head}>
              <div className={styles['group-name']}>{g.name}</div>
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
                      <div className={styles['category-amount']}>
                        ${allocated ? allocated.amount : '0.00'}
                      </div>
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
