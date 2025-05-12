import { Controller, Param, Get, Body, Post } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { DayOfYearDto } from '../reading/dto/day-of-year.dto';
import { NotesService } from './notes.service';
import NoteDto from './dtos/note.dto';
import { User } from '../common/decorators/User.decorator';
import { UseGuards } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES } from '../common/enums/roles.enum';
import { Roles } from '../common/decorators/Roles.decorator';

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get(':dayOfYear')
  @Roles(ROLES.NOTES_READ, ROLES.ADMIN)
  @ApiOperation({
    summary: 'Get a note for a specific day',
    description: 'Requires the `NOTES_READ` permission.',
  })
  @ApiResponse({
    status: 200,
    description: 'Note for the specified day',
    example: 'Abraham was called to leave his home and go to a new land.',
  })
  async getNote(
    @Param() dayOfYearDto: DayOfYearDto,
    @User('unique_id') unique_id: number,
  ): Promise<string> {
    const { dayOfYear } = dayOfYearDto;
    return await this.notesService.getNotesByReadingDay(dayOfYear, unique_id);
  }

  @Post(':dayOfYear')
  @Roles(ROLES.NOTES_WRITE, ROLES.ADMIN)
  @ApiOperation({
    summary: 'Add a note for a specific day',
    description: 'Requires the `NOTES_WRITE` permission.',
  })
  @ApiResponse({
    status: 200,
    description: 'Note updated/created successfully',
    example: 'Note updated/created successfully',
  })
  async insertOrUpdateNote(
    @Body() noteDto: NoteDto,
    @Param() DayOfYearDto: DayOfYearDto,
    @User('unique_id') unique_id: number,
  ): Promise<string> {
    const { dayOfYear } = DayOfYearDto;
    const { note } = noteDto;
    await this.notesService.insertOrUpdateNote(dayOfYear, note, unique_id);
    return 'Note created/updated successfully';
  }
}
