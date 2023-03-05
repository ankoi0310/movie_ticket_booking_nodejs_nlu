import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'role';

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export default interface Role {
  _id: Types.ObjectId;
  type: string;
}

const schema = new Schema<Role>({
  type: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
}, {
  versionKey: false,
});

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);