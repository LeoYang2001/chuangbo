
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    currency:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    voyage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Voyage",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    paymentReason:{
        type:String,
        required:true
    },
    paymentInfo:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:false
    },
    approveLevel:{
        type:Number,
        required:true
    },
    file: {
        type:String,
        required:true
    }
});

const Application = mongoose.models.Application || mongoose.model("Application", applicationSchema);

export default Application;