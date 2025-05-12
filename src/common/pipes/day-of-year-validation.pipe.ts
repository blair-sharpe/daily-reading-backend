import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DayOfYearValidationPipe implements PipeTransform {
  transform(value: any) {
    const dayOfYear = parseInt(value, 10);

    if (isNaN(dayOfYear)) {
      throw new BadRequestException('dayOfYear must be a number');
    }

    if (dayOfYear < 1 || dayOfYear > 365) {
      throw new BadRequestException('dayOfYear must be between 1 and 365');
    }

    return dayOfYear;
  }
}
