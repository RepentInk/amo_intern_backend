export interface PermissionInterface {
  readonly id: number;
  name: string;
  display_name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
