import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TodoOutputDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'Ship production build' })
  title: string;

  @Expose()
  @ApiProperty({ example: false })
  completed: boolean;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  @Expose()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: Date;
}
