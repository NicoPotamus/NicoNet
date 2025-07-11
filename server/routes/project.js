"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var project_1 = require("../controller/project");
var router = (0, express_1.Router)();
// Route to get batched projects with pagination
router.get('/projects', project_1.getProjectsBatched);
exports.default = router;
