import Message from "../model/Message.js"

export const chatSocket = (io) => {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    // JOIN CHAT ROOM
    socket.on("joinChat", ({ userId, targetId }) => {

      const roomId = [userId, targetId].sort().join("_")

      socket.join(roomId)

      console.log("Joined Room:", roomId)

    })


    // SEND MESSAGE
    socket.on("sendMessage", async (data) => {

      try {

        const { senderId, receiverId, message } = data

        if (!senderId || !receiverId || !message) {
          console.log("Invalid message data:", data)
          return
        }

        const roomId = [senderId, receiverId].sort().join("_")

        // Save message to MongoDB
        const newMessage = await Message.create({
          senderId,
          receiverId,
          message
        })

        console.log("Message saved:", newMessage.message)

        // Emit message to room
        io.to(roomId).emit("receiveMessage", newMessage)

      } catch (error) {

        console.log("Socket message error:", error)

      }

    })


    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id)
    })

  })

}