import { ApiProperty } from '@nestjs/swagger';

export class GetEventDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  json: object;

  @ApiProperty({ type: Date })
  createdAt: Date;
}
