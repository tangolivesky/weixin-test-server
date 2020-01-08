import { Controller, Get,Post,Body, Req} from '@nestjs/common';
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
    const {url} = body
    const res = await this.appService.getWXConfig(url);
    return res;
  }

  @Get('check-signature')
  async checkSignature(@Req() request: any,):Promise<boolean>{
    console.log('body',request.query)
    const {signature,echostr,timestamp,nonce} = request.query
    return echostr
  }

}
