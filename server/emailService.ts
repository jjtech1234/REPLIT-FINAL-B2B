import { MailService } from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  resetToken?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check if we have a valid SendGrid API key
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (apiKey && apiKey.startsWith('SG.') && apiKey.length > 20) {
      console.log('Sending email via SendGrid...');
      
      const mailService = new MailService();
      mailService.setApiKey(apiKey);
      
      await mailService.send({
        to: options.to,
        from: 'noreply@b2bmarket.com',
        subject: options.subject,
        html: options.html,
      });
      
      console.log(`✅ Email sent successfully to ${options.to}`);
      return true;
    } else {
      // Try Ethereal Email as fallback for testing
      console.log('Using Ethereal Email for testing...');
      
      // Create test account
      const testAccount = await nodemailer.createTestAccount();
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      
      const info = await transporter.sendMail({
        from: '"B2B Market" <noreply@b2bmarket.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      
      console.log('\n=== EMAIL SENT VIA ETHEREAL (TEST) ===');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      console.log('=== CHECK THE PREVIEW URL TO SEE THE EMAIL ===\n');
      
      return true;
    }
  } catch (error) {
    console.error('Email sending failed:', error);
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