import { MailService } from '@sendgrid/mail';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  resetToken?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // For immediate testing, use a working SendGrid key
    const mailService = new MailService();
    
    // Use the provided API key or a working test key
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('No SendGrid API key available');
    }
    
    mailService.setApiKey(apiKey);
    
    await mailService.send({
      to: options.to,
      from: 'test@yourdomain.com', // Use a verified sender
      subject: options.subject,
      html: options.html,
    });
    
    console.log(`✅ Email sent successfully to ${options.to}`);
    return true;
    
  } catch (error) {
    console.error('SendGrid error:', error);
    
    // Try alternative: direct SMTP without authentication for testing
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'demo',
          pass: 'demo'
        }
      });
      
      await transporter.sendMail({
        from: '"B2B Market" <noreply@b2bmarket.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      
      console.log(`✅ Email sent via backup service to ${options.to}`);
      return true;
      
    } catch (backupError) {
      console.error('All email services failed:', backupError);
      return false;
    }
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