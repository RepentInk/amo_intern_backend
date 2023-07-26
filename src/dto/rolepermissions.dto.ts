export class RolePermissionDto {
  readonly id: number;
  role_id: number;
  permission_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
