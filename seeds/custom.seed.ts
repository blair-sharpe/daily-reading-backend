import { User } from '../src/entities/user.entity';
import { AppDataSource } from './data-source';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  await userRepo.save([
    { email: 'admin@example.com', password: 'password', name: 'Admin' },
    { email: 'user@example.com', password: 'password', name: 'User' },
  ]);

  await AppDataSource.destroy();
  console.log('✅ Seeding complete!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
