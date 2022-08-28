import axios from 'axios';
import type BudgetGroup from '@entities/BudgetGroup';

export async function getGroups(): Promise<BudgetGroup[]> {
  const { data } = await axios.get('/api/groups');
  return data;
}
