import { MinLength, IsEnum } from 'class-validator';

export class CustomerDto {
  readonly id: number;

  @MinLength(3)
  name: string;

  phone_number: string;

  @IsEnum(['male', 'female', 'other'], {
    message: 'Enter: male | female | other',
  })
  gender: 'male' | 'female' | 'other';

  email?: string;
  organization?: string;
  created_at: Date;
  deleted_a?: Date;
}
