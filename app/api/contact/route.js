import nodemailer from 'nodemailer';

export async function POST(request) {
  const body = await request.json();
  
  // Extract all possible fields from both forms
  const { 
    name, 
    email, 
    phone, 
    message,
    // Job support specific fields
    role,
    skill,
    otherSkill,
    type, // 'job_support' or undefined
    subject // custom subject if provided
  } = body;

  console.log('Form Submission:', body);

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

  // Determine if this is a job support request or regular contact
  const isJobSupport = type === 'job_support' || role || skill;

  // Create appropriate email content based on form type
  let emailSubject, textContent, htmlContent;

  if (isJobSupport) {
    // Job Support Email Template
    emailSubject = subject || `🎯 Job Support Request from ${name}`;
    
    textContent = `
🎯 NEW JOB SUPPORT REQUEST

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🎭 Role: ${role === 'seeker' ? 'Job Support Seeker' : 'Job Support Provider'}
💼 Skill: ${skill === 'other' ? otherSkill : skill}
📝 Message: ${message || 'No additional message'}
    `;

    htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">🎯 New Job Support Request</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Rishab Informatica Group</p>
      </div>
      
      <div style="padding: 25px; background: #f8fafc; border-radius: 0 0 10px 10px;">
        <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2d3748; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Job Support Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568; width: 30%;"><strong>👤 Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>📧 Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>📱 Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>🎭 Role:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">
                ${role === 'seeker' ? '🔍 Job Support Seeker' : '👨‍💼 Job Support Provider'}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>💼 Skill:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">
                ${skill === 'other' ? otherSkill : skill}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #4a5568;"><strong>📝 Message:</strong></td>
              <td style="padding: 10px 0; color: #2d3748;">${message || 'No additional message'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #edf2f7; border-radius: 6px;">
            <p style="margin: 0; color: #4a5568; font-size: 14px;">
              <strong>📅 Submitted:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'medium'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  } else {
    // Regular Contact Form Email Template
    emailSubject = `📩 New Contact Form Submission from ${name}`;
    
    textContent = `
📩 New Student Inquiry Received

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
📝 Message: ${message}
    `;

    htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #4299e1 0%, #667eea 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">📩 New Student Inquiry</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Rishab Informatica Group</p>
      </div>
      
      <div style="padding: 25px; background: #f8fafc; border-radius: 0 0 10px 10px;">
        <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2d3748; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568; width: 30%;"><strong>👤 Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>📧 Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><strong>📱 Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #4a5568;"><strong>📝 Message:</strong></td>
              <td style="padding: 10px 0; color: #2d3748;">${message}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    `;
  }

  // Email message details
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ['rishabinformaticagroup@gmail.com', 'support@rishabinformaticagroup.com'], // send to both
    subject: emailSubject,
    text: textContent,
    html: htmlContent,
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