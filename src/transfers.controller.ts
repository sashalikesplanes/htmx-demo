import { Controller, Get, Param, Post, Put, Render, Req } from '@nestjs/common';
import { faker } from '@faker-js/faker'

let id = 0
function createEntry(id) {
  return {
    id,
    reference: `APPJ${faker.number.int({ min: 0, max: 1000 })}`,
    code: `${faker.number.int({ min: 10000, max: 20000 })}`,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    location: faker.location.streetAddress()
  }
}
const transfers = [];
for (let i = 0; i < 20; i++) {
  transfers.push(createEntry(id++))
}

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
