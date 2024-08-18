import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ChatModule } from './chat/chat.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'
import { GithubWebhooksModule } from './github-webhooks/github-webhooks.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bd_test_mongo'),
    ProductsModule,
    AuthModule,
    ChatModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),

    GithubWebhooksModule    
  ],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}
