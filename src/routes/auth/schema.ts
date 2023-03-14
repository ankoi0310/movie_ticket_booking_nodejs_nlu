import Joi from 'joi';
import { JoiAuthBearer } from '../../helper/validator';

export default {
  credential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  register: Joi.object().keys({
    fullName: Joi.string().required().trim(),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(10),
    password: Joi.string().required().min(6),
  }),
};