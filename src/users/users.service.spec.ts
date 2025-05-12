import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { ConflictException } from '@nestjs/common';

const mockNotesRepository = () => ({
  createQueryBuilder: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: ReturnType<typeof mockNotesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockNotesRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const userPayload: User = {
        unique_id: 1,
        name: 'John Doe',
        email: '',
        password: 'password',
      };

      userRepository.findOne.mockResolvedValue(userPayload);

      const user = await service.findById(1);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { unique_id: 1 },
      });
      expect(user).toEqual(userPayload);
    });
  });
  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const userPayload: User = {
        unique_id: 1,
        name: 'John Doe',
        email: 'james@gmail.com',
        password: 'password',
      };

      userRepository.findOne.mockResolvedValue(userPayload);
      const user = await service.findById(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { unique_id: 1 },
      });
      expect(user).toEqual(userPayload);
    });
  });
  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = {
        email: 'jamessmith@gmail.com',
        password: 'password',
        name: 'James Smith',
      };

      const createdUser = {
        unique_id: 1,
        ...user,
      };

      userRepository.create.mockReturnValue(createdUser);
      userRepository.save.mockResolvedValue(createdUser);

      const response = await service.createUser(
        user.email,
        user.password,
        user.name,
      );

      expect(userRepository.create).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledWith(createdUser);

      expect(response).toEqual(createdUser);
    });

    it('should throw a ConflictException if user already exists', async () => {
      const duplicateUser = {
        email: 'jamessmith@gmail.com',
        password: 'password',
        name: 'James Smith',
      };

      userRepository.findOne.mockResolvedValue(duplicateUser);

      await expect(
        service.createUser(
          duplicateUser.email,
          duplicateUser.password,
          duplicateUser.name,
        ),
      ).rejects.toThrow(ConflictException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: duplicateUser.email },
      });

      expect(userRepository.create).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
