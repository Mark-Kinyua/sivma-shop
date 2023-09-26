import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

// Initialise the App
const app = express();

app.get('/', (req, res) => {
    res.send('API is Running...');
});

// Routes
app.use('/api/product', productRoutes);


// Error Handler / Middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));