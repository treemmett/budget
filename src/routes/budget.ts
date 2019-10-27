import { Joi, celebrate } from 'celebrate';
import BudgetController from '../controllers/BudgetController';
import { Router } from 'express';
import authenticate from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const budgets = await BudgetController.listBudgets(req.user.user);
    res.send(budgets);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  authenticate(),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { name } = req.body;

      const budget = await BudgetController.createBudget(req.user.user, name);

      res.send(budget.getBudgetDetails());
    } catch (e) {
      next(e);
    }
  }
);

export default router;
