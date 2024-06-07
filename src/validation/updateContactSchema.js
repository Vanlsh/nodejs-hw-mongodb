import Joi from 'joi';
import { CONTACT_TYPE } from '../constants';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Min string length is not achieved. {{#limit}} required',
    'string.max': 'Max string length is not achieved',
  }),
  phoneNumber: Joi.string(),
  email: Joi.string().email().messages({
    'string.email': 'Email must be a valid email address',
  }),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .valid(CONTACT_TYPE)
    .messages({
      'any.only': `Contact type must be one of ${CONTACT_TYPE.join(', ')}`,
    }),
});
