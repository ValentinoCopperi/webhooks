import { Module } from '@nestjs/common';
import { GithubWebhooksService } from './github-webhooks.service';
import { GithubWebhooksController } from './github-webhooks.controller';

@Module({
  controllers: [GithubWebhooksController],
  providers: [GithubWebhooksService],
})
export class GithubWebhooksModule {}
