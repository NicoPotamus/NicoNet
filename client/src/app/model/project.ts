/**
 * Represents a project in the system
 */
export default interface Project {
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