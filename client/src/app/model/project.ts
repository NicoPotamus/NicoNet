/**
 * Represents a project in the system
 */
export interface Project {
    /** Unique identifier for the project */
    id: string;
    
    /** Name of the project creator or contact */
    name: string;
    
    /** Email of the project creator or contact */
    email: string;
    
    /** Subject or title of the project */
    subject: string;
    
    /** Detailed description or message about the project */
    description: string;
    
    /** Timestamp when the project was created */
    createdAt: string;
}

/**
 * Response type for paginated project requests
 */
export interface PaginatedResponse {
    success: boolean;
    data: {
        projects: Project[];
        pagination: {
            currentPage: number;
            totalPages: number;
            hasMore: boolean;
            totalProjects: number;
        }
    }
}

/**
 * Response type for project creation
 */
export interface ProjectCreateResponse {
    success: boolean;
    data: {
        project: Project;
    }
}

/**
 * Response type for project deletion
 */
export interface ProjectDeleteResponse {
    success: boolean;
    data?: {
        id: string;
    };
    error?: string;
}

/**
 * Response type for admin login
 */
export interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
    };
    error?: string;
}