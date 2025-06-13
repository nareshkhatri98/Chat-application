import express from 'express';
import { login, logout, onBoard, signup } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const AuthRoute = express.Router();


AuthRoute.post('/signup', signup)
AuthRoute.post('/signin', login)
AuthRoute.post('/logout',logout);
AuthRoute.post('/onboarding',protectRoute,onBoard)
// to check login or not.
AuthRoute.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({success:true, user:req.user})
});

export default AuthRoute; 