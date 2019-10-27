import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticate from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate(), (req, res) => {
  res.send(req.user.getUser());
});

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { email, firstName, lastName, password } = req.body;
      const user = await UserController.createUser(
        email,
        firstName,
        lastName,
        password
      );

      res.send({
        user: user.getUser(),
        token: user.getTokenDetails()
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/auth',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    })
  }),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserController.login(email, password);
      res.send(user.getTokenDetails());
    } catch (e) {
      next(e);
    }
  }
);

export default router;
