import express from "express";
import cors from "cors";
import groupRouter from "./routes/group.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000","https://pocket-notes-frontend-navy.vercel.app"],
  credentials: true
}));

// Route declarations
app.use("/api/v1/group",groupRouter);
app.use("/api/v1/message", messageRouter);

export { app };
