// import { Resend } from "resend";
// import { ENV } from "./env.js";

// export const resendClient = new Resend(ENV.RESEND_API_KEY);

// export const sender = {
//   email: ENV.EMAIL_FROM,
//   name: ENV.EMAIL_FROM_NAME,
// };


// import { Resend } from "resend";
// import dotenv from "dotenv";
// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);
// export default resend;

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config(); // load variables from .env file

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};
