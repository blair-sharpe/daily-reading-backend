import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from '../entities/notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private notesRepository: Repository<Notes>,
  ) {}

  async getNotesByReadingDay(
    dayOfYear: number,
    unique_id: number,
  ): Promise<string> {
    const response = await this.notesRepository
      .createQueryBuilder()
      .where({ user_id: unique_id })
      .andWhere({ daily_reading_id: dayOfYear })
      .getOne();
    if (!response) {
      return '';
    }
    return response.note;
  }

  async insertOrUpdateNote(
    dayOfYear: number,
    note: string,
    user_id: number,
  ): Promise<void> {
    const existingNote = await this.notesRepository.findOne({
      where: {
        daily_reading_id: dayOfYear,
        user_id: user_id,
      },
    });

    if (existingNote) {
      existingNote.note = note;
      await this.notesRepository.save(existingNote);
    } else {
      const newNote = this.notesRepository.create({
        daily_reading_id: dayOfYear,
        note: note,
        user_id: user_id,
      });
      await this.notesRepository.save(newNote);
    }
  }
}
