import { Injectable } from '@nestjs/common'
import {ajax} from './utils/ajax'
import {WxAppID,WxAppSecret} from './config'
import {sha1} from './utils/encode'

@Injectable()
export class AppService {

  private async getWxToken():Promise<string>{
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WxAppID}&secret=${WxAppSecret}`
    //const res = await ajax.get(url);
    //const token = res.data.access_token
    //一天两千次调用限制，不够需要做缓存
    
    const token = '29_QxpUlKe2qz9-pFfRuwr-jYY9bDNWzD0U4lULKIj6lAvrz93LQWxZzwQsR8uMLYnpiR5biHhYibsSzkaUH-KlTVvtVUz8DF5-kxjD_RPcbrvean1jISq8FnTM1rpNrBihgw4IOtw4r2rTl04yTCYdAAADMI'
    console.log('token',token)
    return token;
  }

  private async getJsapiTicket():Promise<any>{
    const token = await this.getWxToken()
    //const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
    //const res = await ajax.get(url);
    //const ticket = res.data.ticket
    const ticket = 'kgt8ON7yVITDhtdwci0qeeP46r1sp36q8Lg_eDjA2EYOR12NupGydYlRNKHHxSeqKssfYyEUe1R5xdfKYii9nw'
    console.log('ticket',ticket)
    return ticket;
  }

  public getHello(): string {
    return 'Hello World!';
  }

  public async getWXConfig(url:string):Promise<any>{
    const noncestr = 'Wm3WZYTPz0wzccnW'
    const jsapi_ticket = await this.getJsapiTicket()
    const timestamp = parseInt((new Date().getTime() / 1000).toString())
    const pageUrl = decodeURIComponent(url)
    //const pageUrl = url
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
