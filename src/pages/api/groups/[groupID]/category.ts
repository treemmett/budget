import { v4 } from 'uuid';
import BudgetCategory from '@entities/BudgetCategory';
import BudgetGroup from '@entities/BudgetGroup';
import { nc } from '@utils/nc';
import { validateID } from '@utils/validate';

export default nc().all(async (req, res) => {
  const id = validateID(req.query.groupID);
  const group = await BudgetGroup.findOne({
    relations: {
      categories: true,
    },
    where: { id },
  });
  if (!group) {
    throw new Error('group not found');
  }
  const category = new BudgetCategory();
  category.allocations = [];
  category.id = v4();
  category.name = req.body.name;
  category.sort = 0;
  group.categories.push(category);
  await group.save();
  res.send(group);
});
