import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "./controllers/user";
import { connect } from "./config/db";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '128mb' }));
app.use(bodyParser.urlencoded({ limit: '128mb', extended: true }));
connect();

app.get("/api/v1/user", getUsers);
app.post("/api/v1/user", createUser);
app.put("/api/v1/user/:id", updateUser);
app.delete("/api/v1/user/:id", deleteUser);

app.listen(3000, "0.0.0.0");