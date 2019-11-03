import { Joi, celebrate } from 'celebrate';
import { AccountType } from '../entities/Account';
import BudgetController from '../controllers/BudgetController';
import { Router } from 'express';
import authenticate from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const budgets = await BudgetController.listBudgets(req.user);
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

      const budget = await BudgetController.createBudget(req.user, name);

      res.send(budget.budget.getDetails());
    } catch (e) {
      next(e);
    }
  }
);

router.get('/:id', authenticate(), async (req, res, next) => {
  try {
    const budget = await BudgetController.openBudget(req.params.id, req.user);

    res.send(budget.budget.getDetails());
  } catch (e) {
    next(e);
  }
});

router.get('/:id/account', authenticate(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const controller = await BudgetController.openBudget(id, req.user);
    res.send(controller.budget.accounts.map(a => a.getDetails()));
  } catch (e) {
    next(e);
  }
});

router.post(
  '/:id/account',
  authenticate(),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      type: Joi.string()
        .valid('checking', 'creditCard', 'savings')
        .required()
    })
  }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const controller = await BudgetController.openBudget(id, req.user);
      const account = await controller.createAccount(
        name,
        AccountType[type as keyof typeof AccountType]
      );
      res.send(account.getDetails());
    } catch (e) {
      next(e);
    }
  }
);

router.get('/:id/category', authenticate(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const controller = await BudgetController.openBudget(id, req.user);
    const categories = controller.budget.categories.map(c => c.getDetails());

    res.send(categories);
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
      const controller = await BudgetController.openBudget(id, req.user);
      const category = await controller.createCateogry(name);
      res.send(category.getDetails());
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
      account: Joi.string()
        .uuid()
        .required(),
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
      const { account, amount, category, date, description } = req.body;
      const controller = await BudgetController.openBudget(id, req.user);
      const transaction = await controller.createTransaction(
        account,
        description,
        date,
        category,
        amount
      );
      res.send(transaction.getDetails());
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id/transaction/:year/:month',
  authenticate(),
  celebrate({
    params: {
      year: Joi.number()
        .positive()
        .integer()
        .min(2000)
        .max(2032),
      month: Joi.number()
        .positive()
        .integer()
        .min(1)
        .max(12),
      id: Joi.string().required()
    }
  }),
  async (req, res, next) => {
    try {
      const { id, year, month } = (req.params as unknown) as {
        id: string;
        year: number;
        month: number;
      };

      const controller = await BudgetController.openBudget(id, req.user);
      const transactions = await controller.getTransactions(year, month);
      res.send(transactions.map(t => t.getDetails()));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
