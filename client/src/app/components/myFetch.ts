import { 
    Project, 
    PaginatedResponse, 
    ProjectCreateResponse, 
    ProjectDeleteResponse, 
    LoginResponse 
} from '../model/project';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * Fetch projects with pagination
 * @param page Page number to fetch (defaults to 1)
 * @returns Promise with paginated projects data
 */
export async function getProjects(page: number = 1): Promise<PaginatedResponse> {
    try {
        const response = await fetch(`${API_URL}/projects?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

/**
 * Create a new project
 * @param projectData Project data to be created
 * @returns Promise with created project data
 */
export async function createProject(projectData: Omit<Project, 'id' | 'createdAt'>): Promise<ProjectCreateResponse> {
    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
}

/**
 * Delete a project by ID
 * @param id Project ID to delete 
 * @returns Promise with deleted project ID
 */
export async function deleteProject(id: string): Promise<ProjectDeleteResponse> {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            throw new Error('Authorization required');
        }

        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}

export async function loginAdmin(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
}