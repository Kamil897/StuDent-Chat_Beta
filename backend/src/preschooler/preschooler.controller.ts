import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreschoolerService } from './preschooler.service';
import { CreatePreschoolerDto } from './dto/create-preschooler.dto';
import { UpdatePreschoolerDto } from './dto/update-preschooler.dto';

@Controller('preschooler')
export class PreschoolerController {
  constructor(private readonly preschoolerService: PreschoolerService) {}

  @Post("create")
  create(@Body() createPreschoolerDto: CreatePreschoolerDto) {
    return this.preschoolerService.create(createPreschoolerDto);
  }

  @Get("all")
  findAll() {
    return this.preschoolerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preschoolerService.findOne(Number(id)); // ✅ Преобразуем в `number`
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreschoolerDto: UpdatePreschoolerDto) {
    return this.preschoolerService.update(+id, updatePreschoolerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preschoolerService.remove(+id);
  }
}
