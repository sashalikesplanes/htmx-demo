import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs');
  hbs.registerHelper('concat', function(...args) {
    let outStr = '';
    for (const arg in args) {
      if (typeof args[arg] !== 'object') {
        outStr += args[arg];
      }
    }
    return outStr;
  });
  await app.listen(3000);
}
bootstrap();
