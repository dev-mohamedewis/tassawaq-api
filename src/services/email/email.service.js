import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async ({ email, verificationCode }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject: "Verify your Tassawaq account",
    html: `
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <h1>${verificationCode}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }

  return data;
};

const sendPasswordResetEmail = async ({ email, resetToken }) => {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [email],
    subject: "Reset your Tassawaq password",
    html: `
      <h2>Password Reset</h2>
      <p>Use the following token to reset your password:</p>
      <p>${resetToken}</p>
      <p>This token expires in 15 minutes.</p>
    `,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  return data;
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
};