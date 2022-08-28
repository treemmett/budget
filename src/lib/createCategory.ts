import axios from 'axios';
import type BudgetCategory from '@entities/BudgetCategory';

export async function createCategory({
  groupID,
  name,
}: {
  groupID: string;
  name: string;
}): Promise<BudgetCategory[]> {
  const { data } = await axios.post(`/api/groups/${encodeURIComponent(groupID)}/category`, {
    name,
  });
  return data;
}
