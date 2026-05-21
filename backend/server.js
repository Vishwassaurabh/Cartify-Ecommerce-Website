const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/AuthRoute");
const errorHandler = require("./middlewares/errorHandler");
const ProductRoutes = require("./routes/ProductRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const CartRoutes = require("./routes/CartRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "https://saurabh-cartify-ecommerce.netlify.app",
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

//! mongoDb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((e) => {
    console.log(e);
  });

//! middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://saurabh-cartify-ecommerce.netlify.app",

    credentials: true,
  }),
);
app.use(cookieParser());

//! router
app.use("/", authRoutes);
app.use("/", ProductRoutes);
app.use("/", CategoryRoutes);
app.use("/", OrderRoutes);
app.use("/", CartRoutes);
app.use(AdminRoutes);

//! error handler
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
