import { Controller, Get, Param, Post, Put, Render, Req } from '@nestjs/common';

const transfers = [
  { id: 1, reference: "reference", code: "code", firstname: "sasha", lastname: "kiselev", location: "Julianalaan, Delft" },
]

@Controller('transfers')
export class TransfersController {
  @Get()
  @Render('transfers')
  transfers(@Req() req: Request) {
    console.log('requersrt')
    // @ts-ignore
    const searchCode = req.query.searchCode ?? '';
    const filteredTransfers = transfers.filter(transfer => transfer.code.includes(searchCode))
    return { transfers: filteredTransfers, searchCode }
  }

  @Get(':id')
  @Render('transfer')
  transfer(@Param('id') id: string) {
    return { ...transfers.find(transfer => transfer.id === +id) }
  }

  @Put(':id')
  @Render('transfer')
  updateTransfer(@Param('id') id: string, @Req() req: Request) {
    Object.entries(req.body).forEach(([key, value]) => {
      transfers.find(transfer => transfer.id === +id)[key] = value
    })
    return { ...transfers.find(transfer => transfer.id === +id) }
  }
}
