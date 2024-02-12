const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post('/submit-form', async (req, res) => {
  const { answers } = req.body;

  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'thapabasu000@gmail.com',
        pass: 'wnpzeyqmoppdzgum', // Use the app password here
      },
    });

    // Define email content
    const mailOptions = {
      from: 'editsbasu@gmail.com',
      to: 'thapabasu000@gmail.com',
      subject: "Valentine's Day Questionnaire Answers",
      text: JSON.stringify(answers), // You can customize the email content here
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to the client
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while sending the email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
