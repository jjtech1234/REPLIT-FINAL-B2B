import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  resetToken?: string;
}

// Create SMTP transporter using Ethereal Email (free testing service)
async function createTransporter() {
  // Create test account if needed
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransporter({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: '"B2B Market" <noreply@b2bmarket.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log('\n=== EMAIL SENT SUCCESSFULLY ===');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log('=== END EMAIL INFO ===\n');
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function createPasswordResetEmail(email: string, resetToken: string): EmailOptions {
  const resetUrl = `http://localhost:5000/reset-password?token=${resetToken}`;
  
  return {
    to: email,
    subject: 'Reset Your Password - B2B Market',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p>You requested to reset your password for your B2B Market account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">B2B Market Team</p>
      </div>
    `,
    resetToken
  };
}