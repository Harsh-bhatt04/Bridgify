import ConnectionRequest from '../model/connectionRequest.js';
import User from '../model/userProfile.js';
import '../model/userProfile.js';
import mongoose from 'mongoose';
// Send connection request
// export const sendConnectionRequest = async (req, res) => {
//   try {
//     const { receiverId } = req.params;
//     const senderId = req.user.id;

//     if (senderId === receiverId)
//       return res.status(400).json({ error: "You can't connect with yourself" });

//     // Check if already exists
//     const existing = await ConnectionRequest.findOne({ senderId, receiverId });
//     if (existing) return res.status(400).json({ error: "Request already sent" });

//     await ConnectionRequest.create({ senderId, receiverId });
//     res.json({ message: "Connection request sent!" });

//   } catch (error) {
//     console.error("Send Request Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.id;

    if (!senderId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot connect with yourself"
      });
    }

    // Check both directions
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Connection already exists or pending"
      });
    }

    const request = await ConnectionRequest.create({
      senderId,
      receiverId,
      status: "pending"
    });

    res.status(200).json({
      success: true,
      message: "Connection request sent successfully",
      request
    });

  } catch (error) {
    console.error("Send Request Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
// Accept connection request
// export const acceptConnectionRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const request = await ConnectionRequest.findById(requestId);

//     if (!request) return res.status(404).json({ error: "Request not found" });

//     if (request.receiverId.toString() !== req.user.id)
//       return res.status(403).json({ error: "Not authorized" });

//     request.status = 'accepted';
//     await request.save();

//     // Update both users' connections
//     await User.findByIdAndUpdate(request.senderId, { $push: { connections: request.receiverId } });
//     await User.findByIdAndUpdate(request.receiverId, { $push: { connections: request.senderId } });

//     res.json({ message: "Connection accepted successfully!" });
//   } catch (error) {
//     console.error("Accept Request Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    // Only the receiver can accept
    if (request.receiverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({ success: true, message: "Connection request accepted" });
  } catch (error) {
    console.error("Error in acceptConnectionRequest:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reject connection request
// export const rejectConnectionRequest = async (req, res) => {
//   try {
//     const { requestId } = req.params;
//     const request = await ConnectionRequest.findById(requestId);

//     if (!request) return res.status(404).json({ error: "Request not found" });

//     if (request.receiverId.toString() !== req.user.id)
//       return res.status(403).json({ error: "Not authorized" });

//     request.status = 'rejected';
//     await request.save();

//     res.json({ message: "Connection request rejected" });
//   } catch (error) {
//     console.error("Reject Request Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const rejectConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await ConnectionRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.receiverId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ success: true, message: "Connection request rejected" });
  } catch (error) {
    console.error("Error in rejectConnectionRequest:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// export const getPendingRequests = async (req, res) => {
//   try {
//     console.log("Decoded user from token:", req.user);

//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(400).json({ error: "Invalid token or user ID missing" });
//     }

//     const requests = await ConnectionRequest.find({ receiver: userId, status: 'pending' })
//       .populate('sender', 'username profileImage');

//     res.status(200).json({ success: true, requests });
//   } catch (error) {
//     console.error("Get Pending Requests Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const getPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Receiver userId:", userId);

    const requests = await ConnectionRequest.find({
      receiverId: userId,
      status: "pending"
    }).populate({ path: "senderId", model: User, select: "username profileImage" });

    console.log("Requests found:", requests.length);

    res.json({ success: true, requests });
  } catch (error) {
    console.error("Error in getPendingRequests:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//get all connections for a user
export const getConnections = async (req, res) => {
  try {

    const userId = req.user.id;

    const connections = await ConnectionRequest.find({
      status: "accepted",
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
 .populate({ path: "senderId", model: User, select: "username profileImage" })
.populate({ path: "receiverId", model: User, select: "username profileImage" });

    const users = connections.map(conn => {

      const sender = conn.senderId;
      const receiver = conn.receiverId;

      // return the OTHER user (not the logged-in one)
      if (sender._id.toString() === userId) {
        return receiver;
      } else {
        return sender;
      }

    });

    res.json(users);

  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ message: "Server error" });
  }
};