import { model, Schema } from 'mongoose';
import { CONTACT_TYPE, PERSONAL } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: CONTACT_TYPE,
      default: PERSONAL,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
