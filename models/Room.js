import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
    },
    maxPeople:{
        type: Number,
    },
    description:{
        type: String,
        required: true
    },
    roomNumbers:[{ number: Number, unavailableDates: {type: [Date]}}],
}, {timestamps: true})

export default mongoose.model("Room", RoomSchema)