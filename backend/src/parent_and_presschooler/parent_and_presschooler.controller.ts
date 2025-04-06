import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateParentAndPreschoolDto, UpdateParentAndPreschoolDto } from './dto';
import { ParentAndPreschoolerService } from './parent_and_presschooler.service';


@Controller('parent-and-presschooler')
export class ParentAndPresschoolerController {
  constructor(private readonly parentAndPresschoolerService: ParentAndPreschoolerService) { }

  @Post()
  create(@Body() createParentAndPresschoolerDto: CreateParentAndPreschoolDto) {
    return this.parentAndPresschoolerService.create(createParentAndPresschoolerDto);
  }

  @Get()
  findAll() {
    return this.parentAndPresschoolerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentAndPresschoolerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentAndPresschoolerDto: UpdateParentAndPreschoolDto
  ) {
    return this.parentAndPresschoolerService.update(+id, updateParentAndPresschoolerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentAndPresschoolerService.remove(+id);
  }
}
