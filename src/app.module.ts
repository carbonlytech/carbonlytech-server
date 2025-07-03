import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CarbonDetailsModule } from './carbondetails/carbondetails.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // veya varsayılan zaten .env
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI!),
    AuthModule,
    CarbonDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
