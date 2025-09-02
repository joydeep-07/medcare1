const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");


exports.createContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
};


exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};


// Nodemailer
exports.sendReply = async (req, res) => {
      const { email, replyText } = req.body;
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: "Medical Team Consultation Response",
        html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <style>
              /* Base Styles */
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333333;
                  background-color: #f7f9fc;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 650px;
                  margin: 20px auto;
                  background: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              
              /* Header Section */
              .header {
                  background: linear-gradient(135deg, #1a6fc9, #004e92);
                  color: white;
                  padding: 25px 30px;
                  text-align: center;
              }
              .header h1 {
                  margin: 0;
                  font-size: 22px;
                  font-weight: 600;
              }
              .header p {
                  margin: 8px 0 0;
                  opacity: 0.9;
                  font-size: 14px;
              }
              
              /* Content Section */
              .content {
                  padding: 30px;
              }
              .message {
                  background: #f8fafd;
                  border-left: 4px solid #1a6fc9;
                  padding: 20px;
                  margin-bottom: 25px;
                  border-radius: 0 4px 4px 0;
              }
              .message p {
                  margin: 0 0 15px;
              }
              .message p:last-child {
                  margin-bottom: 0;
              }
              
              /* Action Section */
              .action {
                  background: #f0f7ff;
                  padding: 20px;
                  border-radius: 4px;
                  margin: 25px 0;
                  text-align: center;
              }
              .action-title {
                  font-weight: 600;
                  color: #1a6fc9;
                  margin-bottom: 10px;
              }
              
              /* Footer */
              .footer {
                  padding: 20px 30px;
                  background: #f5f7fa;
                  color: #666666;
                  font-size: 13px;
                  text-align: center;
                  border-top: 1px solid #e1e5eb;
              }
              .signature {
                  margin-top: 25px;
                  border-top: 1px solid #e1e5eb;
                  padding-top: 20px;
              }
              .signature p {
                  margin: 5px 0;
              }
              .disclaimer {
                  font-size: 12px;
                  color: #999999;
                  margin-top: 25px;
                  line-height: 1.5;
              }
              
              /* Responsive */
              @media only screen and (max-width: 600px) {
                  .email-container {
                      margin: 0;
                      border-radius: 0;
                  }
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              
              
              <div class="content">
                  <p>Dear Valued Patient,</p>
                  
                  <p>Thank you for reaching out to our medical team. We have carefully reviewed your inquiry and provided the following professional medical advice:</p>
                  
                  <div class="message">
                      ${replyText.replace(/\n/g, "<br>")}
                  </div>
                  
                  <div class="action">
                      <div class="action-title">Next Steps</div>
                      <p>Should you require further clarification or additional medical consultation, please don't hesitate to contact us through our patient portal or schedule an appointment with your healthcare provider.</p>
                  </div>
                  
                  <p>Remember that this communication does not replace an in-person medical examination when clinically indicated.</p>
                  
                  <div class="signature">
                      <p>With warm regards,</p>
                     
                     
                      <p>Medcare Team</p>
                  </div>
              </div>
              
              <div class="footer">
                  <div class="disclaimer">
                      <p><strong>Confidentiality Notice:</strong> This message and any attachments contain confidential information intended only for the recipient. If you are not the intended recipient, please notify us immediately and delete this message.</p>
                      <p>© ${new Date().getFullYear()} [Your Medical Organization]. All rights reserved.</p>
                  </div>
              </div>
          </div>
      </body>
      </html>
      `,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reply sent successfully!" });
      } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
      }
    };
