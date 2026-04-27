import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../model/userProfile.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

// ✅ Verify Payment & Update Plan
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
      userId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const planRank = { FREE: 0, GOLD: 1, PLATINUM: 2, DIAMOND: 3 };

    if (user.plan === plan) {
      return res.status(400).json({
        success: false,
        message: `You already have ${plan} plan.`,
      });
    }

    if (planRank[plan] <= planRank[user.plan]) {
      return res.status(400).json({
        success: false,
        message: "Downgrades are not allowed. Please upgrade only.",
      });
    }

    const activatedAt = new Date();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    user.plan = plan;
    user.planActivatedAt = activatedAt;
    user.planExpiresAt = expiresAt;

    await user.save();

    return res.json({
      success: true,
      message: "Payment verified & plan activated for 1 year",
      plan,
      expiresAt,
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};