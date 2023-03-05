import Joi from 'joi';
import { JoiObjectId } from '../../helper/validator';

export default {
  cinemaId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    name: Joi.string().min(1).max(200).required(),
    address: Joi.string().min(1).max(200).required(),
    phone: Joi.string().min(1).max(200).required(),
    email: Joi.string().min(1).max(200).required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().min(1).max(200).optional(),
    address: Joi.string().min(1).max(200).optional(),
    phone: Joi.string().min(1).max(200).optional(),
    email: Joi.string().min(1).max(200).optional(),
  }),
  updateStatus: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};