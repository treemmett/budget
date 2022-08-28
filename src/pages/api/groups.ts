import BudgetGroup from '@entities/BudgetGroup';
import { nc } from '@utils/nc';

export default nc().get(async (req, res) => {
  const groups = await BudgetGroup.find({
    relations: {
      categories: true,
    },
  });
  res.send(groups);
});
