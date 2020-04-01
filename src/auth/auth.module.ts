import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { SessionSerializer } from './session.serializer';
import { PassportSessionModule } from './passport-session.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    // PassportSessionModule.forRoot(),
    PassportSessionModule.register(),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AuthResolver,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
