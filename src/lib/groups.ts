import axios from 'axios';
import { QueryKey } from 'react-query';
import type BudgetGroup from '@entities/BudgetGroup';

export async function getGroups(): Promise<BudgetGroup[]> {
  const { data } = await axios.get('/api/groups');
  return data;
}

export async function getGroupByID(id: string): Promise<BudgetGroup> {
  const { data } = await axios.get(`/api/groups/${encodeURIComponent(id)}`);
  return data;
}

export function createGroupsKey(id?: string): QueryKey {
  if (id) {
    return ['groups', { id }];
  }

  return ['groups'];
}
