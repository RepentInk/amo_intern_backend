import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../seeds/dummy.category';
import { Items } from '../seeds/dummy.items';
import { Orders } from '../seeds/dummy.orders';
// import { OrderItems } from '../seeds/dummy.orderItems';
import { Users } from '../seeds/dummy.users';
import { Customers } from '../seeds/dummy.customers';
import { UserLog } from '../seeds/dummy.userLog';
import { Roles } from '../seeds/dummy.role';
import { Permissions } from '../seeds/dummy.permissions';
// import { RolePermissions } from '../seeds/dummy.rolePermissions';

export class DummyData1691160447042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;

    await entityManager.save('Role', Roles);
    await entityManager.save('Permission', Permissions);
    await entityManager.save('Users', Users);
    await entityManager.save('Categories', Category);
    await entityManager.save('Items', Items);
    await entityManager.save('Customer', Customers);
    await entityManager.save('Order', Orders);
    // await entityManager.save('OrderItems', OrderItems);
    await entityManager.save('UserLog', UserLog);
    // await entityManager.save('RolePermissions', RolePermissions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Role');
    await queryRunner.dropTable('Permission');
    await queryRunner.dropTable('Users');
    await queryRunner.dropTable('Categories');
    await queryRunner.dropTable('Items');
    await queryRunner.dropTable('Customer');
    await queryRunner.dropTable('Order');
    await queryRunner.dropTable('OrderItems');
    await queryRunner.dropTable('UserLog');
    await queryRunner.dropTable('RolePermissions');
  }
}
