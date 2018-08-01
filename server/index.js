import express from "express";
import cors from "cors";
import entries from "../routes/entries";
import home from "../routes/home";
import user from "../routes/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/entries", entries);
app.use("/", home);
app.use("/auth", user);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
