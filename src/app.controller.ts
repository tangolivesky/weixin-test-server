import { Controller, Get,Post,Body, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/get-wx-config')
  async getWXConfig(@Body() body:any):Promise<object>{
    console.log('body',body)
    const {url} = body
    const res = await this.appService.getWXConfig(url);
    return res;
  }

  @Get('check-signature')
  async checkSignature(@Query() query:any):Promise<boolean>{
    console.log('body',query)
    const {signature,timestamp,nonce} = query
    // const res = await this.appService.getWXConfig(url);
    // return res;
    return true
  }

}
