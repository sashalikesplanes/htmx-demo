import { Controller, Get, Param, Post, Put, Render, Req } from '@nestjs/common';
import { TransfersService } from './transfers.service';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}
  @Get()
  @Render('transfers')
  transfers(@Req() req: Request) {
    // @ts-ignore
    const searchCode = req.query.searchCode ?? '';
    return { transfers: this.transfersService.list(searchCode), searchCode }
  }

  @Get(':id')
  @Render('transfer')
  transfer(@Param('id') id: string) {
    return this.transfersService.find(+id);
  }

  @Put(':id')
  @Render('transfer')
  updateTransfer(@Param('id') id: string, @Req() req: Request) {
    // @ts-ignore
    this.transfersService.update(+id, req.body);
    return this.transfersService.find(+id);
  }
}
