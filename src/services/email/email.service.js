const sendVerificationEmail = async ({ email, verificationCode }) => {
  // Email provider will be integrated here.
  console.log(`Verification code for ${email}: ${verificationCode}`);
};

const sendPasswordResetEmail = async ({ email, resetToken }) => {
  // Email provider will be integrated here.
  console.log(`Password reset token for ${email}: ${resetToken}`);
};

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
};