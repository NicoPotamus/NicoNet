import type Project from "../model/project";
import { Request, Response } from "express";
import { Pool } from "pg";
import sendSimpleMessage from "./mailer"

// Initialize PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "5432")
});


/**
 * Get projects in batches of 10 with pagination
 */
export const getProjectsBatched = async (req: Request, res: Response) => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const batchSize = 10;
        const offset = (page - 1) * batchSize;

        // Get total count for pagination
        const countResult = await pool.query('SELECT COUNT(*) FROM projects');
        const totalProjects = parseInt(countResult.rows[0].count);

        // Get paginated results
        const query = `
            SELECT 
                id,
                name,
                email,
                subject,
                description,
                created_at as "createdAt"
            FROM projects 
            ORDER BY created_at DESC 
            LIMIT $1 OFFSET $2
        `;
        
        const result = await pool.query(query, [batchSize, offset]);
        
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

    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch projects',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

/**
 * Create a new project
 */
export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, description } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !description) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                message: 'Name, email, subject, and description are required'
            });
        }

        // Insert new project
        const query = `
            INSERT INTO projects (name, email, subject, description)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, subject, description, created_at as "createdAt"
        `;
        
        const result = await pool.query(query, [name, email, subject, description]);
        sendSimpleMessage(name, email, subject, description); // Call to send email after fetching projects
        res.status(201).json({
            success: true,
            data: {
                project: result.rows[0]
            }
        });

    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to create project',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

/**
 * Delete a project by ID
 */
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate project exists
        const checkResult = await pool.query('SELECT id FROM projects WHERE id = $1', [id]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Project not found',
                message: 'No project exists with the specified ID'
            });
        }

        // Delete the project
        const query = `DELETE FROM projects WHERE id = $1 RETURNING id`;
        const result = await pool.query(query, [id]);
        
        res.status(200).json({
            success: true,
            data: {
                id: result.rows[0].id
            }
        });

    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to delete project',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};


