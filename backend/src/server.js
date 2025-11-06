// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import { ENV } from "./lib/env.js";
// import { app, server } from "./lib/socket.js";

// const __dirname = path.resolve();

// const PORT = ENV.PORT || 3000;

// app.use(express.json({ limit: "5mb" })); // req.body
// app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // make ready for deployment
// if (ENV.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("Server running on port: " + PORT);
//   connectDB();
// });
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// ------------------------
// Middleware
// ------------------------
app.use(express.json({ limit: "5mb" })); // parse JSON body

// CORS fix for development (allows any localhost port)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow tools like Postman, curl
      if (origin.startsWith("http://localhost:")) return callback(null, true); // allow any localhost port
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());

// ------------------------
// Routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ------------------------
// Deployment: Serve frontend in production
// ------------------------
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// ------------------------
// Start server & connect DB
// ------------------------
server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

