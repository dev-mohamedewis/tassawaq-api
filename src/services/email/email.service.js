const sendVerificationEmail = async ({ email, verificationCode }) => {
  // Email provider will be integrated here.
  console.log(`Verification code for ${email}: ${verificationCode}`);
};

export { sendVerificationEmail };