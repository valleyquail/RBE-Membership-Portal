import mongoose, { Schema, InferSchemaType } from "mongoose";



const HourSchema = new Schema({
  date: { type: Date, required: true },
  person: { type: Schema.Types.ObjectId, ref: "User", required: true },
  numHours: { type: Number, required: true },
  reason: { type: String, required: true },
});

//Infers the schema and interface type of the model and then exports it
type IHourSchema = InferSchemaType<typeof HourSchema>;

const HoursModel =  mongoose.model<IHourSchema>("Event", HourSchema);

export default HoursModel;