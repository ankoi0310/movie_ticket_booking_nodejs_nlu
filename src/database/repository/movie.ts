import Movie, { MovieModel } from '../model/movie';
import { Types } from 'mongoose';

export const MovieRepository = {
  async exists(id: Types.ObjectId): Promise<boolean> {
    const movie = await MovieModel.exists({ _id: id });
    return movie !== null && movie !== undefined;
  },

  async getById(id: Types.ObjectId): Promise<Movie | null> {
    return MovieModel.findOne({ _id: id, status: true });
  },

  async searchByTitle(keyword: string): Promise<Movie | null> {
    return null;
  },

  async create(movie: Movie): Promise<Movie> {
    return MovieModel.create(movie);
  }
}