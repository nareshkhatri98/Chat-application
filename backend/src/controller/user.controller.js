import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export const getRecommendedUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user.
        { $id: { $nin: currentUser.friends } }, // exclude current user's friends.
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUser);
  } catch (error) {
    console.log("Error in getRecommendedUsers controller ", error.message);
    res.status(500).jsn({ message: "Internal Server Error" });
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// send friend request

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending request to yourself.
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send request yourself." });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    // check if user already friends or not.
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friend with this user." });
    }

    // check the request already exist of not....
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exist between you and this user.",
      });
    }

    // send request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// friend request accept..
export const acceptRequest = async (re, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // verify the current user is the recipient..
    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Your are not authorized to accept this request" });
    }
    friendRequest.status == "accepted";
    await friendRequest.save();

    // add each user to other's friends array...
    // $addToSet adds element to array only if they do not already exist..
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.sender },
    });
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all friend request ..
export const getFriendRequest = async (re, res) => {
  try {
    const incomingsRequest = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic learningLanguage nativeLanguage"
    );

    const acceptedRequest = await FriendRequest.find({
      recipient: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");
    res.status(200).json({ incomingsRequest, acceptedRequest });
  } catch (error) {
    console.log("Error in getFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// outgoing friend request..
export const getOutgoingFriendRequest = async (req, res) => {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic learningLanguage nativeLanguage"
    );
    res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log("Error in getOutgoingFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
