import { JwtAuthGuard } from '../auth/guards/jwtguards';
import { AddCourseDto } from './dto/Add-course.dto';
import { CoursesService } from './courses.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ParseIntPipe,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CourseEntity } from './entities/course.entity';
import { UpdateCourseDto } from './dto/UPdate-course.dto';

import { User } from '../decorators/user.decorator';

@Controller('courses')
export class CoursesController {
  // injection de dependances
  constructor(private CoursService: CoursesService) {}

  @Get('getCours')
  @UseGuards(JwtAuthGuard)
  async getallcours(@User() user): Promise<CourseEntity[]> {
    return await this.CoursService.getCours(user);
  }

  //#####
  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addCours(
    @Body() addCoursDto: AddCourseDto,
    //@Req() req :Request
    @User() user,
  ): Promise<CourseEntity> {
    return await this.CoursService.addCours(addCoursDto, user);
  }
}
