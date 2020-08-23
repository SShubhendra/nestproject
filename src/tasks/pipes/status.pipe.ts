import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class statusValidorPipe implements PipeTransform {
  readonly tastStatusArr = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValid(value)) {
      throw new BadRequestException(`satus value ${value} is invalid status`);
    }
    return value;
  }

  private isValid(val) {
    const index = this.tastStatusArr.indexOf(val);
    return index != -1;
  }
}
