"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const project_1 = require("./controller/project");
const auth_1 = require("./controller/auth");
// Load environment variables
dotenv_1.default.config({ path: '../.env' });
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Health check route
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "NicoNet API is running"
    });
});
// Project routes
app.get('/projects', project_1.getProjectsBatched);
app.post('/projects', (req, res, next) => {
    Promise.resolve((0, project_1.createProject)(req, res)).catch(next);
});
// Auth routes
app.post('/api/auth/login', auth_1.adminLogin);
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});
// Error handler
app.use((err, req, res) => {
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
