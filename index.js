import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "mail.bigiwallet.io",       // From your screenshot
  port: 465,                         // Secure SMTP port
  secure: true,                      // True for port 465 (SSL)
  auth: {
    user: "contact@bigiwallet.io",  // Your domain email
    pass: "Bigiwallet91*",    // Replace with real password or env var
  },
});

app.post("/api/send-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Missing email" });
  }

  const mailOptions = {
    from: "golden.dev.216@gmail.com",
    to: email,
    subject: "Welcome to BigiWallet",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to <span style="color: #0070f3;">BigiWallet</span></h2>
        <p>Your all-in-one crypto wallet for <strong>Bitcoin, Ethereum</strong>, and more.</p>
        <p>At BigiWallet, we make managing your digital assets simple, secure, and powerful.</p>
        <p>Buy, send, receive, and track your crypto across multiple chains — all from one beautifully designed dashboard.</p>
        <ul>
          <li>🔐 <strong>Secure</strong> – Non-custodial and fully encrypted</li>
          <li>⚡ <strong>Fast</strong> – Real-time balance, prices, and transaction history</li>
          <li>🌍 <strong>Global</strong> – Access your wallet anytime, anywhere</li>
          <li>🧠 <strong>Smart</strong> – Insights, charts, and tools that help you stay ahead</li>
        </ul>
        <p>Whether you're a beginner or a blockchain pro, BigiWallet is built to support your crypto journey.</p>
        <p><strong>Let’s build your financial future — securely and seamlessly.</strong></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

export default app;
