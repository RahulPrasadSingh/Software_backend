const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Load environment variables
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN,
  GMAIL_USER,
} = process.env;

// Submit Contact Form
const submitContactForm = async (req, res) => {
  const { name, email, phoneNumber, message, service } = req.body;

  if (!name || !email || !phoneNumber || !message || !service) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save contact form details in MongoDB
    const contact = new Contact({ name, email, phoneNumber, message, service });
    await contact.save();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: GOOGLE_ACCESS_TOKEN, // Use access token from .env
      },
    });

    // Email options
    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER, // Replace this with the recipient's email
      subject: "Web Development Inquiry: New Contact Form Submission",
      html: `
        <p>Dear HR Team,</p>
        <p>You have received a new inquiry from the Website Development Services.</p>
        <p><strong>Contact Form Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone Number:</strong> ${phoneNumber}</li>
          <li><strong>Message:</strong> ${message}</li>
          <li><strong>Service:</strong> ${service}</li>
        </ul>
        <p>Please respond to the inquiry promptly.</p>
        <p>Best regards,<br/>TalentConnect</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Form submitted and email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};

module.exports = { submitContactForm };
