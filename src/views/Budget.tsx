import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BudgetGroup from '../components/BudgetGroup';
import { RouteComponentProps } from '@reach/router';
import { State } from '../redux/store';
import { getBudgets } from '../redux/actions/budget';
import styles from './Budget.module.scss';

const Budget: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const budgetId = useSelector((state: State) => state.budget.selectedBudget);
  const groups = useSelector((state: State) => state.budget.groups);

  const budgetGroups = useMemo(
    () => groups.filter(g => g.budgetId === budgetId),
    [budgetId, groups]
  );

  useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  return (
    <div className={styles['budget-list']}>
      {budgetGroups.map(g => (
        <BudgetGroup key={g.id} id={g.id} name={g.name} />
      ))}
    </div>
  );
};

export default Budget;
