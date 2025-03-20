const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Users/routes/user.routes")

// Load environment variables
dotenv.config();

const app = express();
require("./Config/db");

// Middleware
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req: import("express").Request, res: import("express").Response) => {
  res.send("E-commerce API is running...");
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
