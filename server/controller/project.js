"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjectsBatched = void 0;
const pg_1 = require("pg");
// Initialize PostgreSQL connection pool
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "5432")
});
/**
 * Get projects in batches of 10 with pagination
 */
const getProjectsBatched = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const batchSize = 10;
        const offset = (page - 1) * batchSize;
        // Get total count for pagination
        const countResult = yield pool.query('SELECT COUNT(*) FROM projects');
        const totalProjects = parseInt(countResult.rows[0].count);
        // Get paginated results
        const query = `
            SELECT 
                id,
                name,
                email,
                subject,
                message as description,
                created_at as "createdAt"
            FROM projects 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        const result = yield pool.query(query, [batchSize, offset]);
        res.status(200).json({
            success: true,
            data: {
                projects: result.rows,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalProjects / batchSize),
                    hasMore: offset + batchSize < totalProjects,
                    totalProjects
                }
            }
        });
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch projects',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.getProjectsBatched = getProjectsBatched;
/**
 * Create a new project
 */
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject, message } = req.body;
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'Name, email, subject, and message are required'
            });
        }
        // Insert new project
        const query = `
            INSERT INTO projects (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, subject, message as description, created_at as "createdAt"
        `;
        const result = yield pool.query(query, [name, email, subject, message]);
        res.status(201).json({
            success: true,
            data: {
                project: result.rows[0]
            }
        });
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create project',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.createProject = createProject;
