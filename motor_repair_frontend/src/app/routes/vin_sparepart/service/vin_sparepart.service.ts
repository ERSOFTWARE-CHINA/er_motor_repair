import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { VinSparePart } from '../domain/vin_sparepart.domain';
import { baseUrl } from '../../../shared/shared.service';
import { getTokenOptions } from '../../pages/login/login.service';

function urlencode (str) {  
  str = (str + '').toString();   

  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+').replace(/%/g, "%25");  
} 

@Injectable()
export class VinSparePartService {

  constructor(private http: Http) {}

  user_id = "a04d19d2-fdd4-45de-9fe7-b6ffd67eb71e"
  mikey_url = "http://www.51macc.com:8080/Mattrio/VinInterface/query_vin"
  category2_url = "http://www.51macc.com:8080/Mattrio/ProductInterface/getCategory2"
  category3_url = "http://www.51macc.com:8080/Mattrio/ProductInterface/getCategory3"
  vin_sparepart_url = "http://www.51macc.com:8080/Mattrio/ProductInterface/LikeQueryOes"


  test_url = "http://www.51macc.com:8080/Mattrio/VinInterface/query_vin?userid=a04d19d2-fdd4-45de-9fe7-b6ffd67eb71e&vin=LVSFDFAB2BN230620"
  resource_check_url = baseUrl + "projects/resource/count"

  categoryOne = [
    {category_id: "A", category_name: "底盘部分"},
    {category_id: "B", category_name: "发动机与变速器"},
    {category_id: "C", category_name: "车身部分"},
    {category_id: "D", category_name: "电器及照照明系统"},
    {category_id: "E", category_name: "内外饰部分"},
    {category_id: "F", category_name: "工具"},
    {category_id: "G", category_name: "辅料项目"},

  ]

  getMikey(vin) {
      return this.http.post(this.mikey_url+`?userid=${this.user_id}&vin=${vin}`, null)
          .map(response => response.json()).toPromise();
  }

  getCategoryOne() {
      return this.categoryOne;
  }

  getCategoryTwo(category_one_id, mikey) {
      return this.http.post(this.category2_url+`?userid=${this.user_id}&mikey=${mikey}&categoryid=${category_one_id}`, null)
          .map(response => response.json()).toPromise();
  }

  getCategoryThree(category_two_id, mikey) {
    return this.http.post(this.category3_url+`?userid=${this.user_id}&mikey=${mikey}&categoryid=${category_two_id}`, null)
        .map(response => response.json()).toPromise();
  }
  

  getSparePart(category_name, mikey) {
      // encodeStr = URLEncoder.encode(fname, "utf-8");
      console.log(urlencode("滤清器"))
      return this.http.post(this.vin_sparepart_url+`?userid=${this.user_id}&mikey=${mikey}&like_name=${urlencode(category_name)}`, null)
          .map(response => response.json()).toPromise();   
  }

  getResourceCount(is_use) {
    if (is_use) 
        return this.http.get(this.resource_check_url + `?is_use=true`, getTokenOptions(null))
            .toPromise().then(res => {return res.json()}) 
    else
        return this.http.get(this.resource_check_url + `?is_use=false`, getTokenOptions(null))
            .toPromise().then(res => {return res.json()})
  }
  
}