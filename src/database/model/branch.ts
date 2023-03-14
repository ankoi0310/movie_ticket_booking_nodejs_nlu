import { Schema, model, Types } from 'mongoose';
import { BranchState } from '../../util/enum/cinema';

export const DOCUMENT_NAME = 'Branch';
export const COLLECTION_NAME = 'branch';

export default interface Branch {
  _id: Types.ObjectId;
  name: string;
  address: string;
  state: BranchState;
}

const schema = new Schema<Branch>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export const BranchModel = model<Branch>(DOCUMENT_NAME, schema, COLLECTION_NAME);