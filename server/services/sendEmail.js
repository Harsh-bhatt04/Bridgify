import nodemailer from "nodemailer";

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      html: htmlContent, // ✅ send HTML properly
    });

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

export default sendEmail;
