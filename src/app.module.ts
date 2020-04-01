import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SessionModule } from 'nestjs-session';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportSessionModule } from './auth/passport-session.module';

@Module({
  imports: [
    SessionModule.forRoot({
      session: {
        secret: 'keyboard cat',
        // resave: false,
        // saveUninitialized: false,
      },
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
