import { Injectable } from '@angular/core';
import { getLocalStamp } from '../utils/date';

import {Md5} from 'ts-md5/dist/md5';

export const baseUrl='http://localhost:4000/api/v1/';

// 短信服务接口直接传输
export function getMsgUrl(mobile, captcha) {
    let url = `https://sh2.ipyy.com/sms.aspx`
    let ps = `?action=send&account=zss136&password=a12345&mobile=`+mobile+`&content=尊敬的用户，您的注册验证码为：`+captcha+`。【汽修云】'` 
    return url + ps
}

// 短信服务接口加密传输
export function getMsgHashUrl(mobile, captcha) {
    let stamp = getLocalStamp();
    let content = `尊敬的用户，您的注册验证码为：`+captcha+`。【汽修云】`
    let obj = {
        Stamp: stamp,
        UserName: "zss136",
        Secret: Md5.hashStr("a12345" + stamp),
        Mobile: mobile,
        Text: content
    }
    let j = JSON.stringify(obj)
    console.log(j)

}


@Injectable()
export class GlobalService {
    constructor() {}
}