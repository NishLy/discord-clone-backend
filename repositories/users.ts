import AppDataSource from 'db/connection';
import { Users } from 'entities/Users';

const usersRepository = AppDataSource.getRepository(Users);
export default usersRepository;
