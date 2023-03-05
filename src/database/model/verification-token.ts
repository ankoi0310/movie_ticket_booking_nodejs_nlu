import { Schema, model, Types } from 'mongoose';
import AppUser from './app-user';

export const DOCUMENT_NAME = 'VerificationToken';
export const COLLECTION_NAME = 'verification_token';

export default interface VerificationToken {
  _id: Types.ObjectId;
  appUser: AppUser;
  token: string;
  createdAt: Date;
  isSent: boolean;
  lastSent: Date;
  isVerified: boolean;
  verifiedAt?: Date;
}

const schema = new Schema<VerificationToken>({
  appUser: {
    type: Types.ObjectId,
    ref: 'AppUser',
    required: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
  },
  isSent: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedAt: {
    type: Date,
    required: false,
  },
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastSent',
  }
});

export const VerificationTokenModel = model<VerificationToken>(DOCUMENT_NAME, schema, COLLECTION_NAME);