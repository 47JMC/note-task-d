import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  global_name: { type: String },
  avatar: {
    type: String,
    default: `https://cdn.discordapp.com/embed/avatars/0.png`,
  },
});

export default model("User", userSchema);
