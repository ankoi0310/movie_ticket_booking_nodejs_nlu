import { Schema, Types, model } from "mongoose";
import Movie from "./movie";
import Cinema from "./branch";
import Room from "./room";
import Showtime from "./showtime";
import Ticket from "./ticket";

export const DOCUMENT_NAME = "ShowSchedule";
export const COLLECTION_NAME = "show_schedule";

export default interface ShowSchedule {
  _id: Types.ObjectId;
  cinema: Cinema;
  room: Room;
  showTime: Showtime;
  ticket: Ticket;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<ShowSchedule>({
  cinema: {
    type: Types.ObjectId,
    required: true,
    ref: 'Cinema',
  },
  room: {
    type: Types.ObjectId,
    required: true,
    ref: 'Room',
  },
  showTime: {
    type: Types.ObjectId,
    required: true,
    ref: 'Showtime',
  },
  ticket: {
    type: Types.ObjectId,
    required: true,
    ref: 'Ticket',
  }
}, {
  versionKey: false,
  timestamps: true,
});

export const ShowScheduleModel = model<ShowSchedule>(DOCUMENT_NAME, schema, COLLECTION_NAME);