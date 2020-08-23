"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TasksController = void 0;
var common_1 = require("@nestjs/common");
var status_pipe_1 = require("./pipes/status.pipe");
var TasksController = /** @class */ (function () {
    function TasksController(taskservice) {
        this.taskservice = taskservice;
    }
    TasksController.prototype.getTasks = function (filterObj) {
        if (Object.keys(filterObj).length) {
            return this.taskservice.filtertask(filterObj);
        }
        return this.taskservice.getAllTasks();
    };
    TasksController.prototype.getTaskById = function (id) {
        return this.taskservice.getTaskById(id);
    };
    TasksController.prototype.createtask = function (createTaskDto) {
        return this.taskservice.createTask(createTaskDto);
    };
    TasksController.prototype.updateTask = function (status, id) {
        return this.taskservice.updateTask(status, id);
    };
    TasksController.prototype.deleteTask = function (id) {
        return this.taskservice.deleteTask(id);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Query(common_1.ValidationPipe))
    ], TasksController.prototype, "getTasks");
    __decorate([
        common_1.Get('/:id'),
        __param(0, common_1.Param('id'))
    ], TasksController.prototype, "getTaskById");
    __decorate([
        common_1.Post(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], TasksController.prototype, "createtask");
    __decorate([
        common_1.Patch('/:id'),
        __param(0, common_1.Body('status', status_pipe_1.statusValidorPipe)),
        __param(1, common_1.Param('id'))
    ], TasksController.prototype, "updateTask");
    __decorate([
        common_1.Delete('/:id'),
        __param(0, common_1.Param('id'))
    ], TasksController.prototype, "deleteTask");
    TasksController = __decorate([
        common_1.Controller('tasks')
    ], TasksController);
    return TasksController;
}());
exports.TasksController = TasksController;
