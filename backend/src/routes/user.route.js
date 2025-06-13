import express from "express";
import {
    acceptRequest,
    getFriendRequest,
    getMyFriends,
    getOutgoingFriendRequest,
    getRecommendedUser,
    sendFriendRequest,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRoute = express.Router();

// apply middleware to all routes
userRoute.use(protectRoute);
userRoute.get("/", getRecommendedUser);
userRoute.get("/friends", getMyFriends);
userRoute.post("/friend-request/:id", sendFriendRequest);
userRoute.post("/friend-request/:id/accept", acceptRequest);
userRoute.get("/friend-requests", getFriendRequest);
userRoute.get("/outgoing-friend-request", getOutgoingFriendRequest);

export default userRoute;
