import { DayOfYearValidationPipe } from './day-of-year-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('DayOfYearValidationPipe', () => {
  let pipe: DayOfYearValidationPipe;

  beforeEach(() => {
    pipe = new DayOfYearValidationPipe();
  });

  it('should return the number if valid', () => {
    expect(pipe.transform('1')).toBe(1);
    expect(pipe.transform('100')).toBe(100);
    expect(pipe.transform(365)).toBe(365);
  });

  it('should throw if not a number', () => {
    expect(() => pipe.transform('abc')).toThrow(BadRequestException);
    expect(() => pipe.transform(null)).toThrow(BadRequestException);
    expect(() => pipe.transform(undefined)).toThrow(BadRequestException);
  });

  it('should throw if number is less than 1', () => {
    expect(() => pipe.transform('0')).toThrow(BadRequestException);
    expect(() => pipe.transform('-5')).toThrow(BadRequestException);
  });

  it('should throw if number is greater than 365', () => {
    expect(() => pipe.transform('366')).toThrow(BadRequestException);
    expect(() => pipe.transform('1000')).toThrow(BadRequestException);
  });
});
