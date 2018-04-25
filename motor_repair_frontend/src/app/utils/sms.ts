import {Md5} from 'ts-md5/dist/md5';
import { getLocalStamp } from '../utils/date';

import { TextEncoder } from 'text-encoding';
import { CryptoJS } from 'crypto-js';

import * as crypto from "crypto-js";

// 短信服务接口直接传输
export function getMsgUrl(mobile, captcha) {
  let url = `https://sh2.ipyy.com/sms.aspx`
  let ps = `?action=send&account=zss136&password=a12345&mobile=`+mobile+`&content=尊敬的用户，您的注册验证码为：`+captcha+`。【汽修云】'` 
  return url + ps
}

// 短信服务接口加密传输
export function getMsgHashUrl(mobile, captcha) {
  let stamp = getLocalStamp();
  // let content = `尊敬的用户，您的注册验证码为：`+captcha+`。【汽修云】`
  let content = "我的验证码是：7890。【奥创时代】"
  let obj = {
      UserName: "test",
      Secret: "2A8D628159B0D4D3D4D58A3EB17F3082",
      Stamp: "0414174715",
      Mobile: "15510331875",
      Text: content,
      Ext: "",
      SendTime: ""
  }
  let j = JSON.stringify(obj)
  console.log(j)
  // 转化为utf8编码数组
  let arr = toUTF8Array(j)
  console.log(arr)
  // des加密
  let str = 'test'
  let key =  stringToUnicodeArray(str)+"00000000"
  
  console.log(key)

  console.log(crypto.DES.encrypt(arr, key, { iv: key,mode:crypto.mode.CBC,padding:crypto.pad.Pkcs7,format:crypto.format.Hex}));



}

function toUnicode(str) {
	return str.split('').map(function (value, index, array) {
		var temp = value.charCodeAt(0).toString(16).toUpperCase();
		if (temp.length > 2) {
			return '\\u' + temp;
		}
		return value;
	}).join('');
}

// 字符串转Unicode编码字符串
function stringToUnicodeArray(str){
  let ustr = ""
  let strarray = str.split('')
  for (let i = 0; i < strarray.length; i++) {
    let u = strarray[i].charCodeAt(0).toString(16)
    ustr+=u
  }
  return ustr
}

function toUTF8Array(str) {
  var utf8 = [];
  for (var i=0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6), 
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                    | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18), 
                    0x80 | ((charcode>>12) & 0x3f), 
                    0x80 | ((charcode>>6) & 0x3f), 
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}