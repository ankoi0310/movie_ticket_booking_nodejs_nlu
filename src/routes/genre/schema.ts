import Joi from 'joi';
import { JoiObjectId } from '../../helper/validator';

export default {
  create: Joi.object().keys({
    name: Joi.string().min(1).max(200).required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().min(1).max(200).optional(),
  }),
};