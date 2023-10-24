import mongoose from "mongoose";

const { Schema, SchemaTypes } = mongoose;

const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: SchemaTypes.ObjectId, ref: "User", required: true },
  excused: { type: Boolean, required: true },
  reason: { type: String, required: false },
});

AttendanceSchema.virtual("url").get(function () {
  return "/";
});

export default mongoose.model("Attendance", AttendanceSchema);
