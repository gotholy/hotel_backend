import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import multer from "multer"
import "dotenv/config"
const app = express()

// Function to handle Error on MongoDB connection
const connect = async ( ) => {
   try{        
        await mongoose.connect(process.env.MONGODB)
        console.log("Connect to MongoDB");
    }catch (error){
        throw(error)
    }
}
// Connection watch for MongoDB
mongoose.connection.on("disconnected", ()=> {
    console.log("mongoDB disconnected!");
})
// mongoose.connection.on("connected", ()=> {
//     console.log("mongoDB connected!");
// })

//middlewares
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/hotels", hotelsRoute)

// * ErrorHandler
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        // more Details about the error
        stack: err.stack,
    })
})

app.use(cors())
app.use(express.json())
app.use("/images", express.static("./images"));

// Server Listen with connect() function call for restart every change
app.listen(process.env.PORT, () => 
{
connect()
console.log("Server läuft auf Port:", process.env.PORT)
})