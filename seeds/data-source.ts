import { DataSource } from 'typeorm';
import { Daily_reading } from '../src/entities/daily_reading.entity';
import { Daily_reading_summary } from '../src/entities/daily_reading_summary.entity';
import { UsersRole } from '../src/entities/user_roles';
import { Notes } from '../src/entities/notes.entity';
import { User } from '../src/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'readings',
  entities: [Daily_reading, Daily_reading_summary, User, Notes, UsersRole],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});
