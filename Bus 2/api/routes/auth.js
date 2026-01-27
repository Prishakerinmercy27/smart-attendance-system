import  express from "express";
import { register,login ,AllUser, getUser, updateLocation, updateSeat} from "../controllers/authController.js";

const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/",AllUser);

router.get("/user/:id",getUser);
router.post('/update-location', updateLocation);
router.post('/update-seat', updateSeat);


export default router