import { Schema, Types, model } from "mongoose";
import { SeatType } from "../../util/enum/seat";
import Room from "./room";

export const DOCUMENT_NAME = "Seat";
export const COLLECTION_NAME = "seat";

export default interface Seat {
  _id: Types.ObjectId;
  code: string;
  row: number;
  column: number;
  room: Room;
  type: SeatType;
  status: boolean;
}

const schema = new Schema<Seat>({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  room: {
    type: Types.ObjectId,
    required: true,
    ref: "Room",
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(SeatType),
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  versionKey: false,
});

export const SeatModel = model<Seat>(DOCUMENT_NAME, schema, COLLECTION_NAME);
