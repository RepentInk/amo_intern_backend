import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class ResponseHandlerService {
  successResponse(
    data: any,
    message: string = 'Successful',
    statusCode: HttpStatus = HttpStatus.OK,
  ): any {
    return {
      status: statusCode,
      success: true,
      success_message: message,
      data,
    };
  }

  errorResponse(message: string, statusCode: HttpStatus) {
    throw new HttpException(
      {
        error: error,
        error_message: message,
        status: statusCode,
      },
      statusCode,
    );
  }
}
