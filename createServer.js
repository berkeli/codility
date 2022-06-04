import express from "express";
import cors from "cors";
import solution from "./solution.js";

export default () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.get("/", (_req, res) => {
    res.status(200).send("Hello World!");
  });
  app.post("/api/runTasks", solution);
  return app;
};
