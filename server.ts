const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//routes
const userRoutes = require("./Users/routes/user.routes")
const productRoutes = require("./Products/routes/product.routes")
const reviewRoutes = require("./Reviews/routes/review.routes")
const paymentRoutes = require("./Payments/routes/payment.routes")
const OrderRoutes = require("./Orders/routes/order.routes")



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
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: import("express").Request, res: import("express").Response) => {
  res.send("E-commerce API is running...");
});


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
