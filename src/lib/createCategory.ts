import axios from 'axios';
import type BudgetGroup from '@entities/BudgetGroup';

export async function createCategory({
  groupID,
  name,
}: {
  groupID: string;
  name: string;
}): Promise<BudgetGroup> {
  const { data } = await axios.post(`/api/groups/${encodeURIComponent(groupID)}/category`, {
    name,
  });
  return data;
}
