import { Joi, celebrate } from 'celebrate';
import BudgetController from '../controllers/BudgetController';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateSession from '../middleware/validateSession';

const budgets = Router();

budgets.get('/', validateSession(), async (req, res, next) => {
  try {
    const userController = new UserController(req.session.user);
    const b = await userController.getBudgets();
    res.send(b);
  } catch (e) {
    next(e);
  }
});

budgets.get('/:budgetId', validateSession(), async (req, res, next) => {
  try {
    const budget = await BudgetController.getBudget(
      req.params.budgetId,
      req.session.user
    );
    const controller = new BudgetController(budget);
    const renderedBudget = await controller.displayBudget();
    res.send(renderedBudget);
  } catch (e) {
    next(e);
  }
});

budgets.patch(
  '/:budgetId/categories/:categoryId',
  validateSession(),
  celebrate({
    body: Joi.object().keys({
      index: Joi.number()
        .integer()
        .required()
    })
  }),
  async (req, res, next) => {
    try {
      const { budgetId, categoryId } = req.params;
      const budget = await BudgetController.getBudget(
        budgetId,
        req.session.user
      );
      const controller = new BudgetController(budget);
      const category = await controller.changeCategoryPosition(
        categoryId,
        req.body.index
      );
      res.send(category);
    } catch (e) {
      next(e);
    }
  }
);

budgets.put(
  '/:budgetId/categories/:categoryId/:year/:month',
  validateSession(),
  celebrate({
    body: Joi.object().keys({
      amount: Joi.number().precision(2)
    }),
    params: {
      budgetId: Joi.string(),
      categoryId: Joi.string(),
      year: Joi.number()
        .integer()
        .min(2018)
        .max(2099),
      month: Joi.number()
        .integer()
        .min(0)
        .max(11)
    }
  }),
  async (req, res, next) => {
    try {
      const { budgetId, categoryId, year, month } = req.params;

      const budget = await BudgetController.getBudget(
        budgetId,
        req.session.user
      );
      const controller = new BudgetController(budget);
      const category = await controller.getCategory(categoryId);
      await controller.allocateFunds(category, year, month, req.body.amount);
      res.end();
    } catch (e) {
      next(e);
    }
  }
);

export default budgets;
