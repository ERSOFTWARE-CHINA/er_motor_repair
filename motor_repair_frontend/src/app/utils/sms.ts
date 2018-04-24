import {Md5} from 'ts-md5/dist/md5';
import { getLocalStamp } from '../utils/date';
// import {  } from 'utf8-encoding';

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
  let utf8arr = str2ab("1")
  console.log(utf8arr)
  j = ab2str(utf8arr)
  console.log(j)



}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}