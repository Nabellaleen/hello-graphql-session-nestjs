import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
