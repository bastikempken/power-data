import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(HTTPLoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const request: Request = context.switchToHttp().getRequest();

    const method = request.method;
    const url = request.originalUrl;

    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.log(
          `${response.statusCode} | [${method}] ${url} - ${delay}ms`,
        );
      }),
      catchError((error) => {
        const response: Response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.error(
          `${response.statusCode} | [${method}] ${url} - ${delay}ms`,
        );
        return throwError(error);
      }),
    );
  }
}
