import { Schema, Types, model } from "mongoose";
import Movie from "./movie";
import Seat from "./seat";
import Showtime from "./showtime";
import { TicketState } from "../../util/enum/ticket";

export const DOCUMENT_NAME = "Ticket";
export const COLLECTION_NAME = "ticket";

export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
}

export default interface Ticket {
  _id: Types.ObjectId;
  showtime: Showtime;
  seat: Seat;
  status: TicketState;
}

const schema = new Schema<Ticket>({
  showtime: {
    type: Types.ObjectId,
    ref: "Showtime",
    required: true,
  },
  seat: {
    type: Types.ObjectId,
    ref: "Seat",
    required: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  versionKey: false,
  timestamps: true,
});

export const TicketModel = model<Ticket>(DOCUMENT_NAME, schema, COLLECTION_NAME);