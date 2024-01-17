import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Followership } from '@prisma/client';
import { AuthUser } from 'src/core/auth/auth.types';
import { PaginatedResult } from 'src/lib/prisma/paginator';
import {
  ResponseTemplate,
  TransformInterceptor,
} from 'src/utils/interceptors/transform.interceptor';
import { UseAuth } from '../auth/auth.decorator';
import { FollowershipsService } from './followerships.service';

@Controller('followerships')
export class FollowershipsController {
  constructor(private readonly followershipsService: FollowershipsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('followers')
  @ApiOperation({ summary: "Get authenticated user's followers" })
  @UseInterceptors(TransformInterceptor)
  async getFollowers(
    @UseAuth() user: AuthUser,
    @Query('page') page?: number,
  ): Promise<ResponseTemplate<PaginatedResult<Followership>>> {
    return {
      message: 'Retrieved followers successfully',
      result: await this.followershipsService.getFollowers(user.sub, page),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('followers/:id')
  @ApiOperation({ summary: "Get user's followers by id" })
  @UseInterceptors(TransformInterceptor)
  async getFollowersByUserId(
    @Param('id') id: string,
    @Query('page') page?: number,
  ): Promise<ResponseTemplate<PaginatedResult<Followership>>> {
    return {
      message: 'Retrieved followers successfully',
      result: await this.followershipsService.getFollowers(id, page),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('followings')
  @ApiOperation({ summary: "Get authenticated user's followings" })
  @UseInterceptors(TransformInterceptor)
  async getFollowings(
    @UseAuth() user: AuthUser,
    @Query('page') page?: number,
  ): Promise<ResponseTemplate<PaginatedResult<Followership>>> {
    return {
      message: 'Retrieved followings successfully',
      result: await this.followershipsService.getFollowings(user.sub, page),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get('followings/:id')
  @ApiOperation({ summary: "Get user's followings by id" })
  @UseInterceptors(TransformInterceptor)
  async getFollowingsByUserId(
    @Param('id') id: string,
    @Query('page') page?: number,
  ): Promise<ResponseTemplate<PaginatedResult<Followership>>> {
    return {
      message: 'Retrieved followings successfully',
      result: await this.followershipsService.getFollowings(id, page),
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('follow/:id')
  @ApiOperation({ summary: 'Follows a user' })
  @UseInterceptors(TransformInterceptor)
  async followUser(
    @Param('id') id: string,
    @UseAuth() user: AuthUser,
  ): Promise<ResponseTemplate<null>> {
    await this.followershipsService.follow(user.sub, id);

    return { message: 'Created followership successfully', result: null };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('follow/:id')
  @ApiOperation({ summary: 'Unfollows a user' })
  @UseInterceptors(TransformInterceptor)
  async unfollowUser(
    @Param('id') id: string,
    @UseAuth() user: AuthUser,
  ): Promise<ResponseTemplate<null>> {
    await this.followershipsService.unfollow(user.sub, id);

    return { message: 'Deleted followership successfully', result: null };
  }
}
