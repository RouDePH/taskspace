import {
  applyDecorators,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  Type,
} from '@nestjs/common';
import {
  ApiExtraModels,
  getSchemaPath,
  ApiResponse as ApiOkResponse,
} from '@nestjs/swagger';
import { IResponseOptions } from '..';

export const ApiResponse = <TModel extends Type<any>>(
  model: TModel,
  options: IResponseOptions = { status: HttpStatus.OK, isArray: false },
) =>
  applyDecorators(
    HttpCode(options.status as number),
    ApiExtraModels(model),
    ApiOkResponse({
      status: options.status,
      description: !options.isArray
        ? `Successfully received ${model?.name} model`
        : `Successfully received array of ${model?.name} models`,
      schema: !options.isArray
        ? {
            $ref: getSchemaPath(model),
          }
        : {
            type: 'array',
            items: {
              $ref: getSchemaPath(model),
            },
          },
      isArray: options.isArray,
    }),
    SerializeOptions({ type: model }),
  );
