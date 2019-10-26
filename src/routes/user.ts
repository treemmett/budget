import { Joi, celebrate } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

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

      res.send(user.getUser());
    } catch (e) {
      next(e);
    }
  }
);

export default router;
