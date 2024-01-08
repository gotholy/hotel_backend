import express from "express"
import {updateUser, deleteUser, getUser, getUsers} from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// * TESTROUTES FOR VERIFICATION 
// router.get("/checkauthentication", verifyToken,(req,res,next)=>{
//     res.send("Hello User, you are logged in")
// })
// router.get("/checkuser/:id", verifyUser,(req,res,next)=>{
//     res.send("Hello User, you are logged in and can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("Hello Admin, you are logged in and can do what you want")
// })

// UPDATE
router.put("/:id", verifyUser, updateUser)
// DELETE 
router.delete("/:id",verifyUser, deleteUser)
// GET 
router.get("/:id",verifyUser, getUser)
// GET ALL
router.get("/",verifyAdmin, getUsers)

export default router