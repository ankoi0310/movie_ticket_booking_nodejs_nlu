import { Schema, Types, model } from "mongoose";
import AppUser from "./app-user";

export const DOCUMENT_NAME = "Payment";
export const COLLECTION_NAME = "payment";

export default interface Payment {
  _id: Types.ObjectId;
  user: AppUser;
  amount: number;
  currency: string;
  status: string;
}

const schema = new Schema<Payment>({
  user: {
    type: Types.ObjectId,
    ref: "AppUser",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
});

export const PaymentModel = model<Payment>(DOCUMENT_NAME, schema, COLLECTION_NAME);