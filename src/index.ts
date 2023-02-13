import express from "express";
import cors from "cors";
import db from "./db";
import { initializeDatabase } from "./db/utils/initializeDatabase";

const app = express();

/* if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: "GET, PUT, POST, PATCH, DELETE",
    })
  );
} */

const port = 8084;

app.use(express.json());

// app.use("/api", createRoutes());

app.get("/", (_req, res) => res.send("Server is running."));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

initializeDatabase(db);
