import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            [error.property]: Object.values(error.constraints || {})[0],
          })),
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
