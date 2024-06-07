import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/index.js';

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    'string.min': 'Min string length is not achieved. {{#limit}} required',
    'string.max': 'Max string length is not achieved',
  }),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .required()
    .valid(...CONTACT_TYPE)
    .messages({
      'any.only': `Contact type must be one of ${CONTACT_TYPE.join(', ')}`,
    }),
});
