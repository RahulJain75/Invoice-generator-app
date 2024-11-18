const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs  = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// Configure multer for file handling
const upload = multer({ dest: 'uploads/' });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Email-sending endpoint
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  try {
    let { invoiceData } = req.body;
    const pdfFile = req.file;
    invoiceData=JSON.parse(invoiceData)
    console.log("invoiceData?.info?.billToEmailv",invoiceData?.info?.billToEmail)
    if (!pdfFile) {
      return res.status(400).json({ message: 'PDF file is required.' });
    }

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // For example; configure per your email provider
      secure:false,
      port:645,
      auth: {
        user: process.env.EMAIL_SERVICE_USER_EMAIL, // Your email
        pass: process.env.EMAIL_SERVICE_USER_PASSWORD  // Your email password or app-specific password
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: [invoiceData?.info?.billToEmail], // Replace with recipient's email
      subject: `Invoice #${invoiceData.info.invoiceNumber || '001'}`,
      text: 'Please find attached the invoice.',
      attachments: [
        {
          filename: pdfFile.originalname || 'invoice.pdf',
          path: pdfFile.path,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Remove file after sending
    fs.unlinkSync(pdfFile.path);

    res.status(200).json({ message: 'Invoice email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Catch-all handler to serve the React app for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
