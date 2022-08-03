import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, LogoutDto } from '../dtos/auth.dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('logout')
  logout(@Body() payload: LogoutDto) {
    return payload;
  }
}
