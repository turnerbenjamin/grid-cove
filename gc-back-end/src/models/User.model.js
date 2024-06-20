import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Field required: username"],
    unique: true,
  },
  emailAddress: {
    type: String,
    required: [true, "Field required: email address"],
    validate: [validator.isEmail, "Invalid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Field required: password"],
    select: false,
  },
  roles: {
    type: [
      {
        type: String,
        enum: ["user", "admin"],
      },
    ],
    default: ["user"],
  },
});

const User = model("User", userSchema);
export default User;
