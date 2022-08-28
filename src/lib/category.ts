import axios from 'axios';
import type BudgetCategory from '@entities/BudgetCategory';

export async function createCategory({
  groupID,
  name,
}: {
  groupID: string;
  name: string;
}): Promise<BudgetCategory> {
  const { data } = await axios.post(`/api/groups/${encodeURIComponent(groupID)}/category`, {
    name,
  });
  return data;
}

export async function getCategoryByID(id: string): Promise<BudgetCategory> {
  const { data } = await axios.get(`/api/category/${encodeURIComponent(id)}`);
  return data;
}
