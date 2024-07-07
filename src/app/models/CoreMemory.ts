// models/Emotion.ts
import mongoose from 'mongoose';

const CoreSchema = new mongoose.Schema({
  color: String,
  text: String,
  date: String
});

export default mongoose.models.CoreMemory || mongoose.model('CoreMemory', CoreSchema);