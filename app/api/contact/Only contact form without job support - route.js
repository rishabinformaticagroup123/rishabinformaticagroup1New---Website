import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  console.log('Contact Form Submission:', { name, email, phone, message });

  // Check if environment variable is being loaded
  console.log('EMAIL_USER:', process.env.EMAIL_USER);

  // Setup transporter using Gmail and app password from .env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail ID
      pass: process.env.EMAIL_PASS, // your 16-digit app password
    },
  });

  // Email message details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ['rishabinformaticagroup@gmail.com', 'support@rishabinformaticagroup.com'], // send to both
    subject: `New Contact Form Submission from ${name}`,
    text: `
📩 New Student Inquiry Received

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
📝 Message: ${message}
    `,
    html: `
    <h2>📩 New Student Inquiry Received</h2>
    <p><strong>👤 Name:</strong> ${name}</p>
    <p><strong>📧 Email:</strong> ${email}</p>
    <p><strong>📱 Phone:</strong> ${phone}</p>
    <p><strong>📝 Message:</strong> ${message}</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({
      success: true,
      message: 'Form submitted and email sent successfully!',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to send email.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
