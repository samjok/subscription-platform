import express from "express";
import cors from "cors";
import db from "./db";
import {
  initializeDatabase,
  checkUsers,
  initializeAdmin,
} from "./db/utils/initializeDatabase";

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

// TODO: Write initializing logic which checks that database has users table and there is admin user on the table

/* initializeDatabase(db)
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.log(error);
  });

initializeAdmin(db)
  .then((payload) => {
    console.log(payload);
  })
  .catch((error) => {
    console.log(error);
  });
   */

checkUsers(db)
  .then((payload) => {
    console.log("Connected to PostgreSQL database.");
  })
  .catch((error) => {
    console.log("Failed to connect to database.");
    console.log(error);
  });
