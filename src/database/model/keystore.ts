import { Schema, model, Types } from 'mongoose';
import User from './app-user';

export const DOCUMENT_NAME = 'Keystore';
export const COLLECTION_NAME = 'keystore';

export default interface Keystore {
  _id: Types.ObjectId;
  client: User;
  primaryKey: string;
  secondaryKey: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Keystore>({
  client: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  primaryKey: {
    type: String,
    required: true,
    trim: true,
  },
  secondaryKey: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

// schema.index({ client: 1 });
// schema.index({ client: 1, primaryKey: 1, status: 1 });
schema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });

export const KeystoreModel = model<Keystore>(DOCUMENT_NAME, schema, COLLECTION_NAME);