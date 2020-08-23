import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './Dtos/create-task.dto';
import { filterDto } from './Dtos/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  filtertask(filetrObj: filterDto): Task[] {
    let tasks = this.getAllTasks();
    const { status, search } = filetrObj;
    if (status) {
      tasks = tasks.filter(task => task.status == status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id == id);
    if (!found) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task = {
      id: uuid.v1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(status: TaskStatus, id: string): Task {
    const taskunit = this.getTaskById(id);
    taskunit.status = status;
    return taskunit;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id != found.id);
  }
}
