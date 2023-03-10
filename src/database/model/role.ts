import { Schema, Types, model } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'role';

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export default interface Role {
  _id: Types.ObjectId;
  id: number;
  type: string;
}

const schema = new Schema<Role>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  versionKey: false,
});

schema.index({ id: 1 }, { unique: true });

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);