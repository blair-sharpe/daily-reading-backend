import { Controller, Param, Get, Body, Post } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { DayOfYearDto } from 'src/reading/dto/day-of-year.dto';
import { NotesService } from './notes.service';
import NoteDto from './dtos/note.dto';
import { User } from 'src/common/decorators/User.decorator';
import { UseGuards } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/Roles.decorator';
import { RolesGuard } from 'src/common/guards/Roles.guard';
import { ROLES } from 'src/common/enums/roles.enum';

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
    return 'Note updated successfully';
  }
}
