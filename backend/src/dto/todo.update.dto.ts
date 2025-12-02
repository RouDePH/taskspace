import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class TodoUpdateDto {
  @ApiProperty({ example: 'Ship production build' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
