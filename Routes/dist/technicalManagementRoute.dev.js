"use strict";

var express = require('express');

var router = express.Router();

var TeamController = require('../controller/teamController');

var TotalAssignmentController = require('../controller/totalAssignmentController');

var TotalTaskController = require('../controller/totalTaskController');

var AssignedTaskController = require('../controller/assignedTaskController');

router.post('/team', TeamController.addTeam);
router.get('/team', TeamController.getAllTeam);
router["delete"]('/team/:id', TeamController.deleteTeam);
router.post('/totalAssignment', TotalAssignmentController.addTotalAssignment);
router.get('/totalAssignment', TotalAssignmentController.getAllTotalAssignment);
router["delete"]('/totalAssignment/:id', TotalAssignmentController.deleteTotalAssignment);
router.put('/totalAssignment/:id', TotalAssignmentController.updateTotalAssignment);
router.post('/totalTask', TotalTaskController.addTotalTask);
router.get('/totalTask', TotalTaskController.getAllTotalTask);
router["delete"]('/totalTask/:id', TotalTaskController.deleteTotalTask);
router.put('/totalTask/:id', TotalTaskController.updateTotalTask);
router.post('/assignedTask', AssignedTaskController.addAssignedTask);
router.get('/assignedTask', AssignedTaskController.getAllAssignedTask);
router["delete"]('/assignedTask/:id', AssignedTaskController.deleteAssignedTask);
router.put('/assignedTask/:id', AssignedTaskController.updateAssignedTask);
module.exports = router;