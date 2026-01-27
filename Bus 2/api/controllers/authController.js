import User from "../models/user.js"
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken";
export const register=async (req,res,next)=>{
    try {
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            role:req.body.role,
        })
        await newUser.save()
        return res.status(200).json({message:"user has been created",newUser})
    } catch (err) {
        next(err)
        
    }
};

export const login= async (req,res,next)=>{
    try {
        const user=await User.findOne({email: req.body.email})
        if(!user) return next(createError(404,"user not found!"))
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
          );
        if (!isPasswordCorrect)
        {
            return next(createError(400, "Wrong password or username!"));}
        const token=jwt.sign({id:user._id},process.env.JWT);
        
        const { password, ...otherDetails} =user._doc;
        res.cookie("access_token",token,{
        httpOnly:true,
        })
        .status(200).json({...otherDetails});
    } catch (err) {
        next(err);
        
    }
   
    };
    export const AllUser = async (req, res, next) => {
        try {
            // Fetch only users with the role of 'driver'
            const drivers = await User.find({ role: 'driver' });
            
            // Return the filtered users
            return res.status(200).json({ drivers });
        } catch (err) {
            next(err);
        }
    };
    export const getUser=async (req,res,next)=>{
        try {
            //const type = req.params.type; // Assuming the user ID is provided as a URL parameter
            
            const user= await User.findById(req.params.id);
            
            return res.status(200).json({user});
        } catch (err) {
            next(err)
            
        }
    }
    
    export const updateLocation = async (req, res, next) => {
        try {
            const { userId, latitude, longitude } = req.body;
    
            // Find user by ID and update their location
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { 
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                },
                { new: true } // Return the updated document
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json({ message: 'Location updated successfully', updatedUser });
        } catch (err) {
            next(err);
        }
    };
    export const updateSeat = async (req, res, next) => {
        try {
            const { userId, seat } = req.body;
    
            // Ensure the seat value is an integer and non-negative
            const updatedSeat = parseInt(seat, 10);
            if (isNaN(updatedSeat) || updatedSeat < 0) {
                return res.status(400).json({ message: 'Invalid number of seats' });
            }
    
            // Find user by ID and update their seat
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { seat: updatedSeat },
                { new: true } // Return the updated document
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.status(200).json({ message: 'Seat updated successfully', updatedUser });
        } catch (err) {
            next(err);
        }
    };
    
