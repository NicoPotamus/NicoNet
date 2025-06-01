'use client';

import { useState, useEffect } from 'react';
import { getProjects, loginAdmin, deleteProject } from '../components/myFetch';
import type { Project } from '../model/project';


export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsLoggedIn(true);
            fetchProjects(1);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const data = await loginAdmin(username, password);

        if (data.success && data.data?.token) {
            localStorage.setItem('adminToken', data.data.token);
            setIsLoggedIn(true);
            fetchProjects(1);
        } else {
            setError(data.error || 'Login failed');
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
};

    const fetchProjects = async (page: number) => {
        try {
            const response = await getProjects(page);
            if (response.success) {
                setProjects(response.data.projects);
                setCurrentPage(response.data.pagination.currentPage);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
            setError(errorMessage);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        setProjects([]);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await deleteProject(id);
            if (response.success) {
                // Remove the deleted project from state
                setProjects(projects.filter(project => project.id !== id));
                // If the current page is now empty and we're not on the first page, 
                // fetch the previous page
                if (projects.length === 1 && currentPage > 1) {
                    fetchProjects(currentPage - 1);
                }
            } else {
                setError(response.error || 'Failed to delete project');
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
            setError(errorMessage);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className="text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {projects.map((project) => (
                            <div key={project.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-medium text-gray-900">{project.subject}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{project.name} - {project.email}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">{project.description}</p>
                            </div>
                        ))}
                    </div>

                    {projects.length > 0 && (
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <button
                                onClick={() => fetchProjects(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => fetchProjects(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}