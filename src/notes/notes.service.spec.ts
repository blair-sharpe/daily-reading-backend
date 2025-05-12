import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notes } from '../entities/notes.entity';

describe('NotesService', () => {
  let service: NotesService;
  const mockNotesRepository: any = {
    createQueryBuilder: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Notes), useValue: mockNotesRepository },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  describe('getNotesByReadingDay', () => {
    it('should return a note for a specific day of the year', async () => {
      const note = { note: 'This is a test note' };
      mockNotesRepository.getOne.mockResolvedValue(note);
      const dayOfYear = 1;
      const unique_id = 1;
      const result = await service.getNotesByReadingDay(dayOfYear, unique_id);
      expect(result).toEqual(note.note);
      expect(mockNotesRepository.getOne).toHaveBeenCalledTimes(1);
    });
    it('should return an empty string if no note is found', async () => {
      mockNotesRepository.getOne.mockResolvedValue(null);
      const dayOfYear = 1;
      const unique_id = 1;
      const result = await service.getNotesByReadingDay(dayOfYear, unique_id);
      expect(result).toEqual('');
      expect(mockNotesRepository.getOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('insertOrUpdateNote', () => {
    const note = 'This is a test note';
    const dayOfYear = 1;
    const unique_id = 1;
    const expected = {
      daily_reading_id: 1,
      note: 'This is a test note',
      user_id: 1,
    };
    it('should insert a note for a specific day of the year', async () => {
      mockNotesRepository.findOne.mockResolvedValue(null);
      mockNotesRepository.create.mockReturnValue(expected);
      await service.insertOrUpdateNote(dayOfYear, note, unique_id);
      expect(mockNotesRepository.create).toHaveBeenCalledWith(expected);
      expect(mockNotesRepository.save).toHaveBeenCalledWith(expected);
    });
    it('should update a note for a specific day of the year', async () => {
      mockNotesRepository.findOne.mockResolvedValue({
        note: 'old note',
        daily_reading_id: 1,
        user_id: 1,
      });
      mockNotesRepository.create.mockReturnValue(expected);
      await service.insertOrUpdateNote(dayOfYear, note, unique_id);
      expect(mockNotesRepository.save).toHaveBeenCalledWith(expected);
      expect(mockNotesRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
