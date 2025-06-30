import { MailService } from '@sendgrid/mail';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  resetToken?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check if SendGrid API key is available
    if (process.env.SENDGRID_API_KEY) {
      const mailService = new MailService();
      mailService.setApiKey(process.env.SENDGRID_API_KEY);
      
      await mailService.send({
        to: options.to,
        from: 'noreply@b2bmarket.com',
        subject: options.subject,
        html: options.html,
      });
      
      console.log('\n=== REAL EMAIL SENT VIA SENDGRID ===');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log('=== EMAIL DELIVERED TO REAL INBOX ===\n');
      
      return true;
    } else {
      // Fallback to console logging for development
      console.log('\n=== EMAIL WOULD BE SENT ===');
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Content: ${options.html}`);
      console.log('=== SENDGRID_API_KEY NEEDED FOR REAL DELIVERY ===\n');
      
      return false;
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