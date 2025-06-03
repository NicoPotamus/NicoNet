"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var project_1 = require("./controller/project");
var auth_1 = require("./controller/auth");
var posix_1 = require("path/posix");
// Load environment variables
dotenv_1.default.config({ path: posix_1.default.resolve(__dirname, "../.env") }); // This will look for .env in the project root
// Verify critical environment variables
if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    console.error('Missing required authentication environment variables');
    process.exit(1);
}
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    console.error('Missing required database environment variables');
    process.exit(1);
}
var port = process.env.PORT || 8000;
var app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Health check route
app.get("/", function (req, res) {
    res.json({
        status: "ok",
        message: "NicoNet API is running"
    });
});
// Project routes
app.get('/api/projects', project_1.getProjectsBatched);
app.post('/api/projects', function (req, res, next) {
    Promise.resolve((0, project_1.createProject)(req, res)).catch(next);
});
app.delete('/api/projects/:id', function (req, res, next) {
    Promise.resolve((0, project_1.deleteProject)(req, res)).catch(next);
});
// Auth routes
app.post('/api/auth/login', auth_1.adminLogin);
// Error handler
app.use(function (err, req, res, next) {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});
// Start server
app.listen(port, function () {
    console.log("\uD83D\uDE80 Server is running on port ".concat(port));
    console.log("\uD83D\uDCD1 API Documentation: ".concat(process.env.SERVER_URL || "http://localhost:".concat(port)));
});
