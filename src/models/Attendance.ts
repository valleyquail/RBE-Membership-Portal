import mongoose, { Schema, InferSchemaType } from "mongoose";


const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: Schema.Types.ObjectId, ref: "User", required: true },
  excused: { type: Boolean, required: true },
  reason: { type: String, required: false },
});

//Infers the schema and interface type of the model and then exports it
type IAttendance = InferSchemaType<typeof AttendanceSchema>;

const AttenanceModel =  mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default AttenanceModel;