export const dbConfig = {
  host: process.env.HOST_NAME,
  port: parseInt(process.env.PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users, Order, Items, Category, Customer, OrderItems, UserLog],
  synchronize: true,
  migrations: [],
};
