
// const otpStore = {};

// const setOtp = (email, otp) => {
//   otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 mins
// };

// const verifyOtp = (email, otp) => {
//   const record = otpStore[email];
//   if (!record || record.otp !== otp || Date.now() > record.expires) return false;
//   delete otpStore[email]; // one-time use
//   return true;
// };

// module.exports = { otpStore, setOtp, verifyOtp };
const otpStore = {};

const setOtp = (email, otp) => {
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 mins
 
 console.log("\n otpStore.js")
  // console.log(`OTP set for ${email}: ${otp}. It will expire at ${new Date(otpStore[email].expires).toLocaleString()}`);
};


const verifyOtp = (email, otp) => {
  const record = otpStore[email];
  console.log(`Verifying OTP for ${email}. Provided OTP: ${otp}`);

  if (!record) {
    console.log(`No OTP record found for ${email}`);
    return false;
  }

  if (record.otp !== otp) {
    console.log(`OTP mismatch for ${email}`);
    return false;
  }

  if (Date.now() > record.expires) {
    console.log(`OTP for ${email} has expired.`);
    return false;
  }

  delete otpStore[email]; // One-time use
  console.log(`OTP verified for ${email}. OTP removed from store.`);
  return true;
};

module.exports = { otpStore, setOtp, verifyOtp };
