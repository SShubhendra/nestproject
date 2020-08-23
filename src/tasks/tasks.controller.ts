import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { filterDto } from './Dtos/get-task-filter.dto';
import { statusValidorPipe } from './pipes/status.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskservice: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterObj: filterDto): Task[] {
    if (Object.keys(filterObj).length) {
      return this.taskservice.filtertask(filterObj);
    }
    return this.taskservice.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskservice.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createtask(@Body() createTaskDto: CreateTaskDto): CreateTaskDto {
    return this.taskservice.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(
    @Body('status', statusValidorPipe) status: TaskStatus,
    @Param('id') id: string,
  ): CreateTaskDto {
    return this.taskservice.updateTask(status, id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskservice.deleteTask(id);
  }
}
