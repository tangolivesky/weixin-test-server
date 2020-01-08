import { Injectable } from '@nestjs/common'
import {ajax} from './utils/ajax'
import {WxAppID,WxAppSecret} from './config'
import {sha1} from './utils/encode'

@Injectable()
export class AppService {

  private async getWxToken():Promise<string>{
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WxAppID}&secret=${WxAppSecret}`
    const res = await ajax.get(url);
    const token = res.data.access_token
    //一天两千次调用限制，不够需要做缓存
    return token;
  }

  private async getJsapiTicket():Promise<any>{
    const token = await this.getWxToken()
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
    const res = await ajax.get(url);
    const ticket = res.data.ticket
    return ticket;
  }

  public getHello(): string {
    return 'Hello World!';
  }

  public async getWXConfig(url:string):Promise<any>{
    const noncestr = 'Wm3WZYTPz0wzccnW'
    const jsapi_ticket = await this.getJsapiTicket()
    const timestamp = parseInt((new Date().getTime() / 1000).toString())
    const pageUrl = url;
    const string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${pageUrl}`
    const signature = sha1(string1);
    return{
      signature,
      noncestr,
      jsapi_ticket,
      timestamp,
      url:pageUrl,
      appId:WxAppID,
      string1
    }
  }
}
