"use strict";
exports.__esModule = true;
exports.statusValidorPipe = void 0;
var common_1 = require("@nestjs/common");
var task_model_1 = require("../task.model");
var statusValidorPipe = /** @class */ (function () {
    function statusValidorPipe() {
        this.tastStatusArr = [
            task_model_1.TaskStatus.DONE,
            task_model_1.TaskStatus.IN_PROGRESS,
            task_model_1.TaskStatus.OPEN,
        ];
    }
    statusValidorPipe.prototype.transform = function (value) {
        value = value.toUpperCase();
        if (!this.isValid(value)) {
            throw new common_1.BadRequestException("satus value " + value + " is invalid status");
        }
        return value;
    };
    statusValidorPipe.prototype.isValid = function (val) {
        var index = this.tastStatusArr.indexOf(val);
        return index != -1;
    };
    return statusValidorPipe;
}());
exports.statusValidorPipe = statusValidorPipe;
