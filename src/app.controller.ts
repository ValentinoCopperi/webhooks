import { Controller, Get, HttpException, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { HttpExceptionFilter } from './filters/exeption-filters';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): string {
   
    return this.appService.getHello();
  }
}
