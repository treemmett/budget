import BudgetCategory from '@entities/BudgetCategory';
import { nc } from '@utils/nc';
import { validateID } from '@utils/validate';

export default nc().get(async (req, res) => {
  const id = validateID(req.query.categoryID);
  const category = await BudgetCategory.findOne({
    where: { id },
  });
  if (!category) {
    throw new Error('category not found');
  }
  res.send(category);
});
