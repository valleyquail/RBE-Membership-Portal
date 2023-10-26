import mongoose, { Schema, InferSchemaType } from "mongoose";


const EventSchema = new Schema({
  title: { type: String, required: true },
  password: { type: String, required: false },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

//Infers the schema and interface type of the model and then exports it
type IEventSchema = InferSchemaType<typeof EventSchema>;

const EventModel =  mongoose.model<IEventSchema>("Event", EventSchema);

export default EventModel;
