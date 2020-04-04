import React, { FC } from 'react';
import { BudgetProps } from '../Budget/Budget';
import { RouteComponentProps } from '@reach/router';
import globalStyles from '../../index.scss';
import { useToasts } from '../../components/Toast/Toast';

const Categories: FC<RouteComponentProps<BudgetProps>> = ({
  budgetId,
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

    return;
  }

  return <div className={globalStyles.view}>Categories</div>;
};

export default Categories;
