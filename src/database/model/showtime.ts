import { Schema, Types, model } from "mongoose";
import Movie from "./movie";
import Room from "./room";

export const DOCUMENT_NAME = "Showtime";
export const COLLECTION_NAME = "showtime";

export default interface Showtime {
  _id: Types.ObjectId;
  movie: Movie;
  room: Room;
  startTime: Date;
  endTime: Date;
  status: boolean;
}

const schema = new Schema<Showtime>({
  movie: {
    type: Types.ObjectId,
    required: true,
    ref: "Movie",
  },
  room: {
    type: Types.ObjectId,
    required: true,
    ref: "Room",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  versionKey: false,
});

export const ShowtimeModel = model<Showtime>(DOCUMENT_NAME, schema, COLLECTION_NAME);