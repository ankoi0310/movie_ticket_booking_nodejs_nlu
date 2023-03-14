import { Schema, Types, model } from "mongoose";
import Cinema from "./branch";
import Seat from "./seat";

export const DOCUMENT_NAME = "Room";
export const COLLECTION_NAME = "room";

export default interface Room {
  _id: Types.ObjectId;
  cinema: Cinema;
  name: string;
  state: boolean;
}

const schema = new Schema<Room>({
  cinema: {
    type: Types.ObjectId,
    required: true,
    ref: "Cinema",
  },
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  versionKey: false,
});

export const RoomModel = model<Room>(DOCUMENT_NAME, schema, COLLECTION_NAME);