import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check against environment variables
        if (username === process.env.ADMIN_USERNAME && 
            password === process.env.ADMIN_PASSWORD) {
            
            // Generate JWT token
            const token = jwt.sign(
                { username, role: 'admin' },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                success: true,
                data: { token }
            });
        } else {
            res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Authentication failed'
        });
    }
};
