export class ItemsDto {
  readonly name: string;
  readonly description?: string;
  readonly unit: number;
  readonly price: number;
  readonly category_id?: number;
}
