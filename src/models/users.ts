import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
interface user extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}
const userSchema = new Schema<user>({
  name: { type: String },
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true},
});
export default mongoose.model<user>("user", userSchema);
