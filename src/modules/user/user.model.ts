/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema: Schema = new Schema<TUser>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

// pre hook middleware for hash password
UserSchema.pre<TUser>("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.salts_password)
  );

  next();
});

UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

const User = model<TUser>("User", UserSchema);

export default User;
