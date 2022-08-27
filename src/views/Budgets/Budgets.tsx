import { Budget } from 'budget';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Fab from '../../components/Fab/Fab';
import globalStyles from '../../index.scss';
import styles from './Budgets.scss';

const Budgets: NextPage = () => {
  const [createNewBudget, setCreateNewBudget] = useState(false);
  const [newBudgetName, setNewBudgetName] = useState('');

  useEffect(() => {
    setNewBudgetName('');
  }, [createNewBudget]);

  async function createBudgetAction(name: string): Promise<void> {
    console.log('creating budget', name);

    setCreateNewBudget(false);
  }

  const budgets: Budget[] = [
    {
      categoryGroup: [],
      id: 'abc',
      name: 'my budget',
    },
  ];

  return (
    <div className={globalStyles.view}>
      {budgets.map((budget) => (
        <Link href={`/${budget.id}`} key={budget.id}>
          <a className={styles.budget} href="#.">
            <span className={styles.name}>{budget.name}</span>
          </a>
        </Link>
      ))}
      {createNewBudget && (
        <div className={styles.budget}>
          <input
            className={styles.name}
            onChange={(e) => setNewBudgetName(e.currentTarget.value)}
            onKeyDown={async (e) => {
              const { key, currentTarget } = e;
              if (key === 'Enter') await createBudgetAction(currentTarget.value);
              if (key === 'Esc') setCreateNewBudget(false);
            }}
            value={newBudgetName}
          />
          <Button onClick={() => createBudgetAction(newBudgetName)}>Save</Button>
          <Button color="red" onClick={() => setCreateNewBudget(false)}>
            Cancel
          </Button>
        </div>
      )}
      {!createNewBudget && <Fab onClick={() => setCreateNewBudget(true)}>+</Fab>}
    </div>
  );
};

export default Budgets;
