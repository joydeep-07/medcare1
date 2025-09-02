// controllers/sendNewsletterController.js
const nodemailer = require("nodemailer");
const Newsletter = require("../models/Newsletter");

const sendNewsletter = async (req, res) => {
  const { imageUrl, heading, body } = req.body;

  if (!imageUrl || !heading || !body) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1. Fetch all subscribed emails
    const subscribers = await Newsletter.find({}, "email");
    const emailList = subscribers.map((s) => s.email);

    if (emailList.length === 0) {
      return res.status(400).json({ message: "No subscribers to send to." });
    }

    // 2. Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    // 3. Email content
const mailOptions = {
  from: `"MedCare Newsletter" <${process.env.ADMIN_EMAIL}>`,
  to: emailList,
  subject: heading,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Libertinus+Sans&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Libertinus Sans', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f7fa;
        color: #333;
      }
      .container {
        max-width: 640px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 6px 28px rgba(0,0,0,0.06);
      }
      .header img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        background-color: #ffffff;
      }
      .content {
        padding: 40px 28px;
      }
      .content h1 {
        color: #1a365d;
        font-size: 28px;
        margin: 0 0 16px;
        text-align: center;
        font-weight: 600;
      }
      .intro {
        text-align: center;
        font-size: 15px;
        color: #718096;
        margin-bottom: 24px;
      }
      .content p {
        font-size: 16px;
        color: #4a5568;
        line-height: 1.7;
      }
      .divider {
        margin: 40px 0;
        text-align: center;
        position: relative;
      }
      .divider::before {
        content: "";
        display: block;
        height: 1px;
        background-color: #edf2f7;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
      }
      .divider span {
        background: #fff;
        padding: 0 12px;
        position: relative;
        color: #a0aec0;
        font-size: 13px;
        letter-spacing: 1px;
      }
      .footer {
        background-color: #f8fafc;
        padding: 28px 28px 20px;
        text-align: center;
        font-size: 13px;
        color: #4a5568;
        border-top: 2px solid #e2e8f0;
      }
      .footer p {
        margin: 0;
        line-height: 1.5;
      }
      .social {
        margin-top: 18px;
      }
      .social a {
        margin: 0 10px;
        display: inline-block;
      }
      @media (max-width: 600px) {
        .content {
          padding: 28px 20px;
        }
        .content h1 {
          font-size: 24px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Image -->
      <div class="header">
        <img src="${imageUrl}" alt="Newsletter Image">
      </div>

      <!-- Content -->
      <div class="content">
        <h1>${heading}</h1>
        <div class="intro">Bringing you trusted health updates, tips, and stories – straight from MedCare.</div>
        <p>${body.replace(/\n/g, "<br>")}</p>

        <div class="divider"><span>MedCare</span></div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>You're receiving this email because you subscribed to the MedCare newsletter.<br>
        © ${new Date().getFullYear()} MedCare. All rights reserved.</p>
        
        <div class="social">
          <a href="https://www.instagram.com/mr.paul_16">
            <img src="https://i.postimg.cc/d1Lfh4b1/instagram-gray.png" alt="Instagram" width="20" style="display: block;">
          </a>
          <a href="https://www.facebook.com/joydeep.paul.568089">
            <img src="https://i.postimg.cc/6qs4pRTd/facebook-gray.png" alt="Facebook" width="20" style="display: block;">
          </a>
          <a href="https://x.com/Paul__here">
            <img src="https://i.postimg.cc/fyFpZvtc/twitter-gray.png" alt="Twitter" width="20" style="display: block;">
          </a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `,
};





    // 4. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Newsletter sent successfully." });
  } catch (error) {
    console.error("Failed to send newsletter:", error);
    res.status(500).json({ message: "Failed to send newsletter." });
  }
};

module.exports = sendNewsletter;
