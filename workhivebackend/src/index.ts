import express from "express";
import authRoutes from "./routes/authRoutes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Mock Auth API server running at http://localhost:${PORT}`);
});
