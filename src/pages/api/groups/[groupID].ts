import BudgetGroup from '@entities/BudgetGroup';
import { nc } from '@utils/nc';
import { validateID } from '@utils/validate';

export default nc().get(async (req, res) => {
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
  res.send(group);
});
