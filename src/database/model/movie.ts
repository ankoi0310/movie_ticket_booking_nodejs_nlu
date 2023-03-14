import { Schema, model, Types } from 'mongoose';
import { MovieFormat, MovieState } from '../../util/enum/movie';
import Genre from './genre';

export const DOCUMENT_NAME = 'Movie';
export const COLLECTION_NAME = 'movie';

export default interface Movie {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  genre: Genre;
  rating: number;
  duration: number; // in minutes
  durationFormat: string; // in hours and minutes
  format: MovieFormat[];
  actors: string[];
  directors: string[];
  producers: string[];
  releaseDate: Date;
  status: MovieState;
}

const schema = new Schema<Movie>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  genre: [
    {
      type: Types.ObjectId,
      ref: 'Genre',
    },
  ],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },
  durationFormat: {
    type: String,
    required: true,
  },
  format: {
    type: [String],
    required: true,
  },
  actors: {
    type: [String],
    required: true,
  },
  producers: {
    type: [String],
    required: true,
  },
  directors: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export const MovieModel = model<Movie>(DOCUMENT_NAME, schema, COLLECTION_NAME);