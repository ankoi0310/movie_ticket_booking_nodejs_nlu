import { Schema, Types, model } from "mongoose";

export const DOCUMENT_NAME = "Genre";
export const COLLECTION_NAME = "genre";

export default interface Genre {
  _id: Types.ObjectId;
  name: string;
}

const schema = new Schema<Genre>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  versionKey: false,
});

export const GenreModel = model<Genre>(DOCUMENT_NAME, schema, COLLECTION_NAME);