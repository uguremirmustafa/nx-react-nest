import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { APP_FILTER } from '@nestjs/core';
import { AddressesModule } from './addresses/addresses.module';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
// import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
// import { AddressesController } from './addresses/addresses.controller';

@Module({
  imports: [
    // PostsModule,
    // CommentsModule,
    AddressesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
