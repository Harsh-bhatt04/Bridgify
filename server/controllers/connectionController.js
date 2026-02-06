import ConnectionRequest from '../model/connectionRequest.js';
import User from '../model/userProfile.js';

// Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user.id;

    if (!senderId) return res.status(401).json({ success: false, message: "Unauthorized" });
    if (senderId === receiverId)
      return res.status(400).json({ success: false, message: "You can't connect with yourself" });

    const existing = await ConnectionRequest.findOne({ senderId, receiverId });
    if (existing)
      return res.status(400).json({ success: false, message: "Request already sent" });

    const request = await ConnectionRequest.create({
      senderId,
      receiverId,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      message: "Connection request sent successfully",
      request,
    });
  } catch (error) {
    console.error("Send Request Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

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