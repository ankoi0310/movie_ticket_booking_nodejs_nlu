import { Schema, model } from 'mongoose';
import AppUser from './app-user';
import { Types } from 'mongoose';

export const DOCUMENT_NAME = 'UserInfo';
export const COLLECTION_NAME = 'user_info';

export default interface UserInfo {
  id: Types.ObjectId;
  appUser: AppUser;
  fullName: string;
  phone: string;
  profilePicUrl: string;
}

const schema = new Schema<UserInfo>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  profilePicUrl: {
    type: String,
    required: false,
    trim: true,
  }
}, {
  versionKey: false,
});

schema.index({ appUser: 1 });

export const UserInfoModel = model<UserInfo>(DOCUMENT_NAME, schema, COLLECTION_NAME);
