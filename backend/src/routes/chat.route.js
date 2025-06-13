import express from 'express';
import { getStreamToken } from '../controller/chat.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const chatRoute  = express.Router();


chatRoute.get("/token", protectRoute,getStreamToken)


export default chatRoute;