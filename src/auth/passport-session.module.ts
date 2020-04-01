import * as passport from 'passport';

// ********** V2 ************
import { DynamicModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

const DEFAULT_ROUTES = [{ path: '*', method: RequestMethod.ALL }];

export class PassportSessionModule {
  static register(): DynamicModule {
    return {
      module: PassportSessionModule,
    };
  }
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
        passport.initialize(),
        passport.session(),
    ]
    consumer
        .apply(...middlewares)
        .forRoutes(...DEFAULT_ROUTES)
  }
}


// ********** V1 ************
// import {
//     createModule,
//     FacadeModuleStaticOptional
//   } from 'create-nestjs-middleware-module';

// interface Options {
//     maxDuration?: number
// }

// export const PassportSessionModule = createModule<Options>(options => {
//     return [
//         passport.initialize(),
//         passport.session(),
//     ]
//     // app.use(passport.initialize());
//     // app.use(passport.session());
// }) as FacadeModuleStaticOptional<Options>
