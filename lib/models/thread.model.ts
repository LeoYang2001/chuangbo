import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});



let Thread;

try {
  // Try to fetch the existing model (if it has already been compiled)
  Thread = mongoose.model('Thread');
} catch (e) {
  // If the model does not exist, create and compile it
  Thread = mongoose.model('Thread', threadSchema);
}

export default Thread;