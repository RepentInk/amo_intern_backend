import { MinLength } from 'class-validator';
export class CreateRoleDto {
  id: number;

  // eslint-disable-next-line prettier/prettier
  @MinLength(3)
  name: string;

  description?: string;
}
