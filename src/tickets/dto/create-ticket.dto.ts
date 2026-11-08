import { IsString, Length, Matches, ValidateIf } from 'class-validator';
import { IsEnum } from 'class-validator';

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTicketDto {
  
  @IsString()
  @Length(5, 120)
  @Matches(/\S/, { message: 'title debe contener texto' })
  title!: string;
  
  @IsString()
  @Length(10, 5000)
  @Matches(/\S/, { message: 'description debe contener texto' })
  description!: string;
  
  @ValidateIf((_obj: unknown, value: unknown) => value !== undefined)
  @IsEnum(Priority)
  priority?: Priority;
}
