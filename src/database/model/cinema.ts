import { Schema, model, Types } from 'mongoose';
import { CinemaState } from '../../util/enum/cinema';

export const DOCUMENT_NAME = 'Cinema';
export const COLLECTION_NAME = 'cinema';

export default interface Cinema {
  _id: Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  email: string;
  state: CinemaState;
}

const schema = new Schema<Cinema>({
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
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
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

export const CinemaModel = model<Cinema>(DOCUMENT_NAME, schema, COLLECTION_NAME);