import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema({
  title: { type: String, required: true },
  password: { type: String, required: false },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Event", EventSchema);
