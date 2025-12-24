import express from "express";
import path from "path";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import formRoutes from "./routes/formRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import globalProductRoutes from "./routes/globalProductRoutes.js";
import manufacturerRoutes from "./routes/manufacturerRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

export const app = express();
config({ path: "./config.env" });
const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ACCESS_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

// ✅ Simple GET API for root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server Status</title>
      </head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>Your server is running ✅</h1>
      </body>
    </html>
  `);
});




app.get('/data', async (req, res) => {
  try {
    const data = await getDataFromDB();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/forms", formRoutes);
app.use("/api/v1/products", productRoutes);


app.use("/api/globalproducts", globalProductRoutes);
app.use("/api/manufacturers", manufacturerRoutes);
app.use("/api/customers", customerRoutes);


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "..", "client", "dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
//   });
// }


removeUnverifiedAccounts();
connection();

app.use(errorMiddleware);
