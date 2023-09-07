
import mongoose from "mongoose";

const voyageSchema = new mongoose.Schema({
  portToll: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  departureTime:{
    type:Date,
    required:true
  },
  arrival: {
    type: String,
    required: true,
  },
  arrivalTime:{
    type:Date,
    required:true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voyageNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type:String,
    required:true
  },
  applications:{
    type:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
      }
    ],
    default : []
  },
  file: {
        type:String,
        required:true
    }
});

const Voyage = mongoose.models.Voyage || mongoose.model("Voyage", voyageSchema);

export default Voyage;