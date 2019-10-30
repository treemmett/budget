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

router.get('/:id', authenticate(), async (req, res, next) => {
  try {
    const budget = await BudgetController.openBudget(
      req.params.id,
      req.user.user
    );

    res.send(budget.getBudgetDetails());
  } catch (e) {
    next(e);
  }
});

router.get('/:id/category', authenticate(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const controller = await BudgetController.openBudget(id, req.user.user);
    res.send(controller.getCategories());
  } catch (e) {
    next(e);
  }
});

router.post(
  '/:id/category',
  authenticate(),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const controller = await BudgetController.openBudget(id, req.user.user);
      const category = await controller.createCateogry(name);
      res.send(controller.getCategoryDetails(category.id));
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/:id/transaction',
  authenticate(),
  celebrate({
    body: Joi.object().keys({
      amount: Joi.number()
        .positive()
        .precision(2)
        .required(),
      category: Joi.string()
        .uuid()
        .required(),
      date: Joi.string()
        .isoDate()
        .required(),
      description: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { amount, category, date, description } = req.body;
      const controller = await BudgetController.openBudget(id, req.user.user);
      const transaction = await controller.createTransaction(
        description,
        date,
        category,
        amount
      );
      res.send(transaction);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
