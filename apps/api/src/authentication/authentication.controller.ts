import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwtAuthentication.guard';
import JwtRefreshGuard from './guards/jwtRefresh.guard';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './types/requestWithUser.interface';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const { cookie: accessTokenCookie, token: accessToken } =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return {
      user,
      accessToken,
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookiesForLogOut()
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  async authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    console.log(user);
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const { cookie: accessTokenCookie, token: accessToken } =
      this.authenticationService.getCookieWithJwtAccessToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      user: request.user,
      accessToken,
    };
  }
}
