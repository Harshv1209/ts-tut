import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
interface user  {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}
const userSchema = new Schema<user & Document>({
  name: { type: String },
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true},
  phone: { type: String }
});
export default mongoose.model<user>("user", userSchema);
