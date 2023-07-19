import { IsEnum } from 'class-validator';
export class CreateRoleDto {
  id: number;

  @IsEnum(['salesperson', 'marketer', 'administrator'])
  name: string;

  description: string;
}
