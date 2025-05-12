import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily_reading } from './entities/daily_reading.entity';
import { Daily_reading_summary } from './entities/daily_reading_summary.entity';
import { GeminiApiModule } from './gemini-api/gemini-api.module';
import { ReadingModule } from './reading/reading.module';
import { SummaryModule } from './summary/summary.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { Notes } from './entities/notes.entity';
import { RolesModule } from './roles/roles.module';
import { UsersRole } from './entities/user_roles';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'readings',
      entities: [Daily_reading, Daily_reading_summary, User, Notes, UsersRole],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([
      Daily_reading,
      Daily_reading_summary,
      Notes,
      UsersRole,
      User,
    ]),
    AuthModule,
    GeminiApiModule,
    ReadingModule,
    ReadingModule,
    SummaryModule,
    UsersModule,
    NotesModule,
    RolesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
