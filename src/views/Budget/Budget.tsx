import { Link, RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';
import cx from 'classnames';
import styles from './Budget.scss';
import { useToasts } from '../../components/Toast/Toast';

export interface BudgetProps {
  budgetId: string;
}

const Budget: FC<RouteComponentProps<BudgetProps>> = ({
  budgetId,
  children,
  navigate,
}) => {
  const { addToast } = useToasts();
  if (!budgetId) {
    navigate('/').catch(e =>
      addToast({
        message: e.toString(),
        status: 'error',
        title: 'Something went wrong',
      })
    );
  }

  return (
    <div className={styles.view}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Budget;
