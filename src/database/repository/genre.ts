import { Types } from "mongoose";
import Genre, { GenreModel } from "../model/genre";

export const GenreRepository = {
  async getById(id: Types.ObjectId): Promise<Genre | null> {
    return GenreModel.findById(id).lean().exec();
  },

  // async getFieldsById(id: Types.ObjectId, ...fields: string[]): Promise<Genre | null> {
  // },

};