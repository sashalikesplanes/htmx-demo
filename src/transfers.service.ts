import { faker } from '@faker-js/faker'

type Transfer = {
  id: number;
  reference: string;
  code: string;
  firstname: string;
  lastname: string;
  location: string;
};

export class TransfersService {
  private readonly transfers: Transfer[] = [];
  private id = 0;

  constructor() {
    for (let i = 0; i < 20; i++) {
      this.createRandom();
    }
  }

  list(searchCode = ''): Transfer[] {
    return [...this.transfers.filter(transfer => transfer.code.includes(searchCode))];
  }

  find(id: number): Transfer | undefined {
    return this.transfers.find((transfer) => transfer.id === id);
  }

  update(id: number, transfer: Partial<Transfer>): Transfer {
    const index = this.transfers.findIndex((transfer) => transfer.id === id);
    console.log(transfer)
    this.transfers[index] = { ...this.transfers[index], ...transfer };
    console.log(this.transfers[index])
    return { ...this.transfers[index] };
  }

  private createRandom() {
    this.transfers.push({
      id: this.id++,
      reference: `APPJ${faker.number.int({ min: 0, max: 1000 })}`,
      code: `${faker.number.int({ min: 10000, max: 20000 })}`,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      location: faker.location.streetAddress()
    });
  }
}

