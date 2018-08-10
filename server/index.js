import express from "express";
import cors from "cors";

import { serve, setup } from "swagger-ui-express";
import entries from "../routes/entries";
import user from "../routes/user";

import swaggerDocument from "../swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/entries", entries);

app.use("/auth", user);
const options = {
  customCss: ".swagger-ui .topbar { display: none }"
};
app.use("/", serve, setup(swaggerDocument, options));

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
