import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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

  errorResponse(message: string, error: any, statusCode: HttpStatus) {
    throw new HttpException(
      {
        error: true,
        error_message: message,
        data: error,
      },
      statusCode
    );
  }

}
