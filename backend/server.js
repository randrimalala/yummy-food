const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const { setSocketInstance } = require("./utils/notification");

const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const leadRoutes = require("./routes/leads");
const clientRoutes = require("./routes/clientInfoRoute");
const chatbotRoutes = require("./routes/chatbot.js");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const blogRoutes = require('./routes/blog');
const reviewRoutes = require("./routes/reviewRoutes");
const commentRoutes = require("./routes/commentRoutes");
const iaRoutes = require('./routes/iaRoutes');

const app = express();

// 🔐 Liste des domaines autorisés
const allowedOrigins = [
  "http://localhost:5173",
  "https://mph-leaving-candidate-electro.trycloudflare.com",
];

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de socket.io avec CORS correct
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Partage de l'instance io dans tout le projet
setSocketInstance(io);

// Gestion des connexions socket
io.on("connection", (socket) => {
  console.log("Client connecté, id:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client déconnecté", socket.id);
  });
});

// Middleware
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: "fastfood-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", dashboardRoutes);
app.use('/api/blog', blogRoutes);
app.use("/api/products", reviewRoutes);
app.use("/api/blog", commentRoutes);
app.use('/api/ia', iaRoutes);

// Production build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Connexion à MongoDB + lancement du serveur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté");
    server.listen(5000, () => console.log("🚀 Serveur lancé sur le port 5000"));
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));
