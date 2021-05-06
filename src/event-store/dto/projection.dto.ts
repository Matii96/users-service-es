import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class ProjectionDto {
  @ApiProperty({ type: Date })
  @IsDate()
  upTo: Date;
}
