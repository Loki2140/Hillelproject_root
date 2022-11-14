import { Schema, model, SchemaTypes } from "mongoose";
import { UserModel } from "./user_model.js";

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "UserModel" },
  refreshToken: { type: String, required: true }
});
export const TokenModel = model("Token", TokenSchema);
