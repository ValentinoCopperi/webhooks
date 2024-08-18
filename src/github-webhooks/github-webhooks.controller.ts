import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { GithubWebhooksService } from './github-webhooks.service';

@Controller('github-webhooks')
export class GithubWebhooksController {
  constructor(private readonly githubWebhooksService: GithubWebhooksService) {}

@Get()
helloWorld(){
  return "Hello world"
}
  @Post()
  handleWebhook(
    @Headers("x-github-event") githubEvent : string,
    @Body() body : any 
  ){

    console.log({githubEvent})
    return { githubEvent };
  }
}
