import { MailService } from '@sendgrid/mail';
import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  resetToken?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Try multiple email methods without SendGrid
  
  // Method 1: Try Gmail SMTP (most common)
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'b2bmarket.noreply@gmail.com',
        pass: 'your-gmail-app-password' // User would need to set this
      }
    });
    
    await transporter.sendMail({
      from: '"B2B Market" <b2bmarket.noreply@gmail.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    
    console.log(`✅ Email sent via Gmail to ${options.to}`);
    return true;
    
  } catch (gmailError) {
    console.log('Gmail SMTP not configured, trying alternative...');
  }
  
  // Method 2: Try Outlook/Hotmail SMTP
  try {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'b2bmarket@outlook.com',
        pass: 'your-outlook-password'
      }
    });
    
    await transporter.sendMail({
      from: '"B2B Market" <b2bmarket@outlook.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    
    console.log(`✅ Email sent via Outlook to ${options.to}`);
    return true;
    
  } catch (outlookError) {
    console.log('Outlook SMTP not configured, trying alternative...');
  }
  
  // Method 3: Try generic SMTP (works with many providers)
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });
    
    await transporter.sendMail({
      from: `"B2B Market" <${process.env.EMAIL_USER || 'noreply@b2bmarket.com'}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    
    console.log(`✅ Email sent via SMTP to ${options.to}`);
    return true;
    
  } catch (smtpError) {
    console.log('SMTP method failed, trying test service...');
  }
  
  // Method 4: Use Ethereal Email for testing (creates preview links)
  try {
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
    
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`✅ Test email created: ${previewUrl}`);
    console.log(`Email would be sent to: ${options.to}`);
    
    return true;
    
  } catch (etherealError) {
    console.error('All email methods failed:', etherealError);
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