import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService) {}

  setup(app: INestApplication): OpenAPIObject {
    const baseUrl = this.configService.get<string>('app.doc', '/docs');
    const config = new DocumentBuilder()
      .setTitle(`${this.configService.get<string>('app.name', 'name')} API`)
      .setDescription(
        this.configService.get<string>('app.description', 'description'),
      )
      .setVersion(this.configService.get<string>('app.version', '1.0'))
      .setExternalDoc('OpenAPI Schema', `${baseUrl}/openapi.json`)
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (_, methodKey: string, version: string) =>
        `${methodKey}_${version}`,
    };

    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup(baseUrl, app, document, {
      jsonDocumentUrl: `${baseUrl}/openapi.json`,
      yamlDocumentUrl: `${baseUrl}/openapi.yaml`,
    });

    return document;
  }
}
