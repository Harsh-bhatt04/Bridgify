import Message from "../model/Message.js";

export const getMessages = async (req,res) => {

  const { user1, user2 } = req.query;

  const messages = await Message.find({
    $or:[
      { senderId:user1, receiverId:user2 },
      { senderId:user2, receiverId:user1 }
    ]
  }).sort({createdAt:1});

  res.json(messages);

};