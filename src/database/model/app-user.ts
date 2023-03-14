import { Schema, model, Types } from 'mongoose';
import Role from './role';
import UserInfo from './user-info';
import VerificationToken from './verification-token';

export const DOCUMENT_NAME = 'AppUser';
export const COLLECTION_NAME = 'app_user';

export default interface AppUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  verified: boolean;
  accountNotLocked: boolean;
  userInfo: UserInfo;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<AppUser>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  accountNotLocked: {
    type: Boolean,
    default: true,
  },
  userInfo: {
    type: Types.ObjectId,
    required: true,
    ref: 'UserInfo',
  },
  roles: {
    type: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Role',
      },
    ],
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

export const AppUserModel = model<AppUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);