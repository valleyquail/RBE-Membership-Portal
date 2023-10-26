import mongoose, {Schema, InferSchemaType} from "mongoose";



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

//Infers the schema and interface type of the model and then exports it
type IUserSchema = InferSchemaType<typeof UserSchema>;

const UserModel =  mongoose.model<IUserSchema>("Event", UserSchema);

export default UserModel;
