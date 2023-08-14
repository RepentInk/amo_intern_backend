import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfileDto } from '../dto/profile.dto';
import { AuthService } from 'src/services/auth.service'; 
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('')
@UseGuards(AuthService)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Put('update-profile/:id')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID of the user to update',
    example: 1,
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    required: true,
    description: 'User fullname',
    example: 'John Doe',
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    required: true,
    description: 'User email address',
    example: 'nyarko@gmail.com',
  })
  @ApiParam({
    name: 'phone_number',
    type: 'string',
    required: true,
    description: 'User phone number',
    example: '0544474706',
  })
  @ApiOperation({ summary: 'Update auth user profile' })
  @ApiOkResponse({ description: 'User profile updated successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Passwords do not match' })
  async updateUserInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserData: ProfileDto,
  ): Promise<void> {
    await this.profileService.updateUserInfo(id, updateUserData);
  }


  @ApiOperation({ summary: 'Update auth user password' })
  @Put('update_password/:id')
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
    description: 'New password of the user',
    example: 'passworD123',
  })
  @ApiParam({
    name: 'confirm_password',
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
      await this.profileService.updateUserPassword(id, profileDto);
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
