import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  pronouns: { type: String },
  bio: { type: String, maxLength: 100 },
  email: { type: String, unique: true, regex: "(w+)@.w+", sparse: true },
  user_id: { type: String, sparse: true },
  iqp_term: { type: String },
  admin: { type: Boolean, required: false },
});

export default mongoose.model("User", UserSchema);
