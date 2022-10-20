import { AddProfilDto } from './dto/addProfilDto';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwtguards';
import { User } from '../decorators/user.decorator';
import { ProfileEntity } from './entities/profile.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {}
@Controller('profiles')
export class ProfilesController {
  // injection de dependances
  constructor(private readonly profilService: UsersService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addProfil(
    @Body() AddProfilDto: AddProfilDto,
    @User() user,
  ): Promise<ProfileEntity> {
    return await this.profilService.addProfil(AddProfilDto, user);
  }
  /*
     @Get('getProfilByUser')
     @UseGuards(JwtAuthGuard)
      async getProfil(@User() user): Promise<ProfilEntity[]>{
      return await this.profilService.getProfil(user);*/
}
/*
  
 
  
  ///////////////////
  @Get('/:id')
  getProfilById(
    @Param('id') id 
  )
  {return this.profilService.getProfilById(+id); }

  @Delete('/:id')
  deleteProfil(
    @Param('id',ParseIntPipe) id
  ){
    console.log(typeof id)
 return this.profilService.deleteProfil(id);
}


  @Put(':id')
  modofierProfil(
    @Param('id') id,
    @Body() newprofil:Partial<AddProfilDto>
  ){

   return this.profilService.modifierProfil(id, newprofil);
  }
*/
