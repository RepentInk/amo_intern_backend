export interface BasicController {
  findAll(): Promise<any[]>;

  findOne(id: number): Promise<any>;

  create(request: any): Promise<any>;

  update(request: any, id: number): Promise<any>;

  delete(request: any): Promise<any>;
}
