import { MinLength } from 'class-validator';
export class RoleDto {
  readonly id: number;
  @MinLength(3)
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
