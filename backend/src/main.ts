import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerService } from './shared';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('GLOBAL');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const swaggerService = app.get(SwaggerService);
  const reflector = app.get(Reflector);

  console.log(configService.get<number>('app.port', 3030));

  app.set('trust proxy', 'loopback');
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api');

  const corsOrigin = configService.get<string>('app.frontend.origin');
  if (corsOrigin) {
    app.enableCors({
      origin: corsOrigin,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    });
  }

  swaggerService.setup(app);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector, {
      strategy: 'exposeAll',
      excludeExtraneousValues: true,
    }),
  );

  const port = configService.get<number>('app.port', 3030);
  const hostname = configService.get<string>('app.host', '0.0.0.0');

  await app.listen(port, hostname);

  if (process.send) process.send('ready');

  process.on('SIGTERM', () =>
    app
      .close()
      .catch((error) => logger.fatal(error))
      .finally(() => process.exit(0)),
  );

  process.on('SIGINT', () =>
    app
      .close()
      .catch((error) => logger.fatal(error))
      .finally(() => process.exit(0)),
  );
}

bootstrap();
