const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: "Appointment Received",
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; background-color: #ffffff;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 3px solid #2563eb;">
            <h2 style="color: #2563eb; font-size: 24px; margin: 0; text-align: center;">
              Appointment Received
            </h2>
          </div>
          
          <div style="padding: 20px;">
            <p style="margin-bottom: 16px;">Dear ${appointment.name},</p>
            
            <p style="margin-bottom: 16px;">
              We've received your appointment request with <strong>${
                appointment.doctor
              }</strong>.
              We'll review it and confirm shortly.
            </p>
    
            <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; margin-bottom: 12px; color: #1e293b; font-size: 18px;">Appointment Details</h3>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 4px 0; width: 100px;"><strong>Date:</strong></td>
                  <td style="padding: 4px 0;">${new Date(
                    appointment.date
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Time:</strong></td>
                  <td style="padding: 4px 0;">${appointment.time}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Status:</strong></td>
                  <td style="padding: 4px 0; color: #2563eb; font-weight: bold;">Pending</td>
                </tr>
              </table>
            </div>
    
            <div style="background: #e6f2ff; padding: 12px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0;">
                <strong>What's next?</strong> You'll receive another email once your appointment is confirmed, 
                typically within 24 hours.
              </p>
            </div>
    
            <p style="margin-bottom: 16px;">
              For any questions or to modify your appointment, please reply to this email.
            </p>
    
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="margin-bottom: 4px;">Best regards,</p>
              <p style="margin: 0; font-weight: bold;">Medical Care Team</p>
              <p style="margin: 8px 0 0; color: #64748b;">${
                process.env.ADMIN_EMAIL
              }</p>
            </div>
          </div>
        </div>
      `,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status with email notification
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Sending status update email using Nodemailer
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: appointment.email,
      subject: `Your Appointment Has Been ${status}`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333; background-color: #ffffff;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 3px solid ${
            status === "Confirmed" ? "#16a34a" : "#dc2626"
          };">
            <h2 style="color: ${
              status === "Confirmed" ? "#16a34a" : "#dc2626"
            }; font-size: 24px; margin: 0; text-align: center;">
              Appointment ${status}
            </h2>
          </div>
          
          <div style="padding: 20px;">
            <p style="margin-bottom: 16px;">Dear ${appointment.name},</p>
            
            <p style="margin-bottom: 16px;">
              Your appointment with <strong>${
                appointment.doctor
              }</strong> has been
              <span style="color: ${
                status === "Confirmed" ? "#16a34a" : "#dc2626"
              }; font-weight: bold;">
                ${status.toLowerCase()}
              </span>.
            </p>
    
            ${
              status === "Confirmed"
                ? `
              <div style="background: #e6f2ff; padding: 12px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #16a34a;">
                <p style="margin: 0;">
                  <strong>Please note:</strong> Arrive 15 minutes before your scheduled time 
                  to complete any necessary paperwork and ensure a smooth visit.
                </p>
              </div>
              `
                : `
              <div style="background: #fee2e2; padding: 12px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #dc2626;">
                <p style="margin: 0;">
                  <strong>We apologize for any inconvenience.</strong> Please contact us to 
                  reschedule or discuss alternative options.
                </p>
              </div>
              `
            }
    
            <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; margin-bottom: 12px; color: #1e293b; font-size: 18px;">Appointment Details</h3>
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 4px 0; width: 100px;"><strong>Date:</strong></td>
                  <td style="padding: 4px 0;">${new Date(
                    appointment.date
                  ).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Time:</strong></td>
                  <td style="padding: 4px 0;">${appointment.time}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Department:</strong></td>
                  <td style="padding: 4px 0;">${appointment.department}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Doctor:</strong></td>
                  <td style="padding: 4px 0;">${appointment.doctor}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0;"><strong>Status:</strong></td>
                  <td style="padding: 4px 0; color: ${
                    status === "Confirmed" ? "#16a34a" : "#dc2626"
                  }; font-weight: bold;">
                    ${status}
                  </td>
                </tr>
              </table>
            </div>
    
            <p style="margin-bottom: 16px;">
              For any questions or assistance, please reply to this email or contact our office directly.
            </p>
    
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="margin-bottom: 4px;">Best regards,</p>
              <p style="margin: 0; font-weight: bold;">Medical Care Team</p>
              <p style="margin: 8px 0 0; color: #64748b;">${
                process.env.ADMIN_EMAIL
              }</p>
            </div>
          </div>
        </div>
      `,
    });

    res.json(appointment);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error updating appointment",
      error: error.message,
    });
  }
};
