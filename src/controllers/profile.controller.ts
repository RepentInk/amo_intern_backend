import {
  Controller,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfileDto } from '../dto/profile.dto';
import {
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('updateName/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID of the user to be updated',
    example: 1,
  })
  @ApiParam({
    name: 'newName',
    type: 'string',
    required: true,
    description: 'New name of the user',
    example: 'John Doe',
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    description: 'the users password used to verify credentials',
    example: 'password123',
  })
  @ApiOkResponse({ description: 'User name updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  async updateName(@Param('id') id: number, @Body() profileDto: ProfileDto) {
    try {
      await this.profileService.updateUserName(
        id,
        profileDto.fullName,
        profileDto.password,
      );
      return { message: 'User name updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (error.message === 'Invalid password') {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put('updateEmail/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID of the user to update email',
    example: 1,
  })
  @ApiParam({
    name: 'newEmail',
    type: 'string',
    required: true,
    description: 'New email of the user',
    example: 'john@example',
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    description: 'the users password used to verify credentials',
    example: 'password123',
  })
  @ApiOkResponse({ description: 'User email updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  async updateEmail(@Param('id') id: number, @Body() profileDto: ProfileDto) {
    try {
      await this.profileService.updateUserEmail(
        id,
        profileDto.email,
        profileDto.password,
      );
      return { message: 'User email updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (error.message === 'Invalid password') {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put('updatePhone/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID of the user to update phone number',
    example: 1,
  })
  @ApiParam({
    name: 'newPhoneNumber',
    type: 'string',
    required: true,
    description: 'New phone number of the user',
    example: '1234567890',
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    description: 'the users password used to verify credentials',
    example: 'password123',
  })
  @ApiOkResponse({ description: 'User phone number updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  async updatePhoneNumber(
    @Param('id') id: number,
    @Body() profileDto: ProfileDto,
  ) {
    try {
      await this.profileService.updateUserPhoneNumber(
        id,
        profileDto.phoneNumber,
        profileDto.password,
      );
      return { message: 'User phone number updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (error.message === 'Invalid password') {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Put('update-password/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID of the user to update password',
    example: 1,
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    description: 'the users password used to verify credentials',
    example: 'Paasword123',
  })
  @ApiParam({
    name: 'newPassword',
    type: 'string',
    required: true,
    description: 'New password of the user',
    example: 'passworD123',
  })
  @ApiParam({
    name: 'confirmPassword',
    type: 'string',
    required: true,
    description: 'Confirm new password of the user',
    example: 'passworD123',
  })
  @ApiOkResponse({ description: 'User password updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Invalid old password or passwords do not match',
  })
  async updatePassword(
    @Param('id') id: number,
    @Body() profileDto: ProfileDto,
  ) {
    try {
      await this.profileService.updateUserPassword(
        id,
        profileDto.password,
        profileDto.newPassword,
        profileDto.confirmPassword,
      );
      return { message: 'User password updated successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else if (
        error.message === 'Invalid old password' ||
        error.message === 'Passwords do not match'
      ) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Update failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
