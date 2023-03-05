import Joi from 'joi';
import { JoiAuthBearer } from '../../helper/validator';

export default {
  create: Joi.object().keys({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    releaseDate: Joi.date().required(),
    duration: Joi.number().required(),
    rating: Joi.number().required(),
  }),
  update: Joi.object().keys({
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    releaseDate: Joi.date(),
    duration: Joi.number(),
    rating: Joi.number(),
  }),
  delete: Joi.object().keys({
    id: Joi.string().required().trim(),
  })
}