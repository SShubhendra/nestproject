import { TaskStatus } from '../task.model';

export class filterDto {
  status: TaskStatus;
  search: string;
}
