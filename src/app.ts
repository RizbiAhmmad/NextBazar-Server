/* eslint-disable @typescript-eslint/no-explicit-any */
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import qs from "qs";
import { envVars } from "./app/config/env";
import { auth } from "./app/lib/auth";
import { IndexRoutes } from "./app/routes";
import { requestLogger } from "./app/middleware/requestLogger";

const app: Application = express();

app.set("query parser", (str: string) => qs.parse(str));

app.use(requestLogger);

// Global request logger for debugging
// app.use((req, res, next) => {
//   console.log(`🚀 [${req.method}] ${req.url}`);
//   next();
// });

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", toNodeHandler(auth));

// 3. General Parsers (These must come AFTER the /webhook route)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Next Bazar Server!");
});

export default app;
