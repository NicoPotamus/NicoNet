import "reflect-metadata";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path/posix";
import projectRoutes from "./routes/project";
import authRoutes from "./routes/auth";
import tunnelRoutes from "./routes/tunnel";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });  // This will look for .env in the project root

// Verify critical environment variables
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error('Missing required authentication environment variables');
    process.exit(1);
}

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error('Missing required database environment variables');
    process.exit(1);
}

// Verify Cloudflare configuration
if (!process.env.CLOUDFLARE_DOMAIN) {
    console.warn('CLOUDFLARE_DOMAIN not set, using default domain');
}

const port = process.env.PORT || 8000;
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Health check route
app.get("/", (req: Request, res: Response) => {
    res.json({ 
        status: "ok",
        message: "NicoNet API is running"
    });
});

// Mount modular routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tunnel', tunnelRoutes);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📑 API Documentation: ${process.env.SERVER_URL || `http://localhost:${port}`}`);
});