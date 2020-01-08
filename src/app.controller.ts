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
    console.log('body',body)
    const {url} = body
    const res = await this.appService.getWXConfig(url);
    return res;
  }

  @Get('check-signature')
  async checkSignature(@Req() request: any,):Promise<boolean>{
    console.log('body',request)
    const {signature,timestamp,nonce} = request
    // const res = await this.appService.getWXConfig(url);
    // return res;
    return true
  }

}
