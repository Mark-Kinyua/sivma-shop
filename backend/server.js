import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

// Initialise the App
const app = express();

// Body parser middleware - allows us to get body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is Running...');
});

// Routes
app.use('/api/product', productRoutes);
app.use('/api/users', userRoutes);


// Error Handler / Middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));