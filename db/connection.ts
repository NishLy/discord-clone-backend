import { Users } from 'entities/Users';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nishly',
  password: '7882',
  database: 'chatty',
  entities: [Users],
});

AppDataSource.initialize();

export default AppDataSource;
