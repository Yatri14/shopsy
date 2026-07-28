import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'demo@example.com',
      pass: process.env.SMTP_PASS || 'demo-password',
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Shopsy <no-reply@shopsy.dev>',
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error('Email delivery failed', error);
    return false;
  }
}
