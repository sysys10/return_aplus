import mongoose,{ Document, Schema } from "mongoose";
export interface Imemories extends Document {
  text: string;
  date: string;
  color: string;
}
const MemorySchema: Schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Memory = mongoose.models.memories|| mongoose.model<Imemories>("memories", MemorySchema);

export default Memory;