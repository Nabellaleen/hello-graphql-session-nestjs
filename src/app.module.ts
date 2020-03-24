import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SessionModule.forRoot({
      session: { secret: 'keyboard cat' },
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
