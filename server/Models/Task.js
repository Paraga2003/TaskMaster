import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  user: { type: String, required: true }, // References Clerk user ID
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  dueDate: { type: Date }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);