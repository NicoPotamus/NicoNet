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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.createProject = exports.getProjectsBatched = void 0;
var pg_1 = require("pg");
// Initialize PostgreSQL connection pool
var pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "5432")
});
/**
 * Get projects in batches of 10 with pagination
 */
var getProjectsBatched = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, batchSize, offset, countResult, totalProjects, query, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                page = Math.max(1, parseInt(req.query.page) || 1);
                batchSize = 10;
                offset = (page - 1) * batchSize;
                return [4 /*yield*/, pool.query('SELECT COUNT(*) FROM projects')];
            case 1:
                countResult = _a.sent();
                totalProjects = parseInt(countResult.rows[0].count);
                query = "\n            SELECT \n                id,\n                name,\n                email,\n                subject,\n                description,\n                created_at as \"createdAt\"\n            FROM projects \n            ORDER BY created_at DESC \n            LIMIT $1 OFFSET $2\n        ";
                return [4 /*yield*/, pool.query(query, [batchSize, offset])];
            case 2:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    data: {
                        projects: result.rows,
                        pagination: {
                            currentPage: page,
                            totalPages: Math.ceil(totalProjects / batchSize),
                            hasMore: offset + batchSize < totalProjects,
                            totalProjects: totalProjects
                        }
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error fetching projects:', error_1);
                res.status(500).json({
                    success: false,
                    error: 'Failed to fetch projects',
                    message: error_1 instanceof Error ? error_1.message : 'Unknown error occurred'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProjectsBatched = getProjectsBatched;
/**
 * Create a new project
 */
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, subject, description, query, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, email = _a.email, subject = _a.subject, description = _a.description;
                // Validate required fields
                if (!name_1 || !email || !subject || !description) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            error: 'Missing required fields',
                            message: 'Name, email, subject, and description are required'
                        })];
                }
                query = "\n            INSERT INTO projects (name, email, subject, description)\n            VALUES ($1, $2, $3, $4)\n            RETURNING id, name, email, subject, description, created_at as \"createdAt\"\n        ";
                return [4 /*yield*/, pool.query(query, [name_1, email, subject, description])];
            case 1:
                result = _b.sent();
                res.status(201).json({
                    success: true,
                    data: {
                        project: result.rows[0]
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error('Error creating project:', error_2);
                res.status(500).json({
                    success: false,
                    error: 'Failed to create project',
                    message: error_2 instanceof Error ? error_2.message : 'Unknown error occurred'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
/**
 * Delete a project by ID
 */
var deleteProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, checkResult, query, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, pool.query('SELECT id FROM projects WHERE id = $1', [id])];
            case 1:
                checkResult = _a.sent();
                if (checkResult.rows.length === 0) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            error: 'Project not found',
                            message: 'No project exists with the specified ID'
                        })];
                }
                query = "DELETE FROM projects WHERE id = $1 RETURNING id";
                return [4 /*yield*/, pool.query(query, [id])];
            case 2:
                result = _a.sent();
                res.status(200).json({
                    success: true,
                    data: {
                        id: result.rows[0].id
                    }
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error deleting project:', error_3);
                res.status(500).json({
                    success: false,
                    error: 'Failed to delete project',
                    message: error_3 instanceof Error ? error_3.message : 'Unknown error occurred'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProject = deleteProject;
