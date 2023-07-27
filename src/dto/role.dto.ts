import { MinLength } from 'class-validator';
export class RoleDto {
  id: number;
  @MinLength(3)
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
