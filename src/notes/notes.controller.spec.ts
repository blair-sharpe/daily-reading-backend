import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { DayOfYearDto } from '../reading/dto/day-of-year.dto';
import NoteDto from './dtos/note.dto';

describe('NotesController', () => {
  let controller: NotesController;
  let mockNotesService: any;

  const unique_id = 1;
  const expectedNote = 'This is a test note';
  const dayOfYear: DayOfYearDto = { dayOfYear: 1 };

  beforeEach(async () => {
    mockNotesService = {
      getNotesByReadingDay: jest.fn().mockResolvedValue(expectedNote),
      insertOrUpdateNote: jest.fn().mockResolvedValue(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [{ provide: NotesService, useValue: mockNotesService }],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });
  describe('getNote', () => {
    it('should return a note for a specific day', async () => {
      const results = await controller.getNote(dayOfYear, unique_id);
      expect(mockNotesService.getNotesByReadingDay).toHaveBeenCalledWith(
        dayOfYear.dayOfYear,
        unique_id,
      );
      expect(results).toEqual(expectedNote);
    });
  });

  describe('insertOrUpdateNote', () => {
    it('should insert or update a note for a specific day', async () => {
      const notePayload: NoteDto = {
        note: 'This is a test note',
      };
      const result = await controller.insertOrUpdateNote(
        notePayload,
        dayOfYear,
        unique_id,
      );
      expect(result).toEqual('Note created/updated successfully');
      expect(mockNotesService.insertOrUpdateNote).toHaveBeenCalledWith(
        dayOfYear.dayOfYear,
        notePayload.note,
        unique_id,
      );
    });
  });
});
