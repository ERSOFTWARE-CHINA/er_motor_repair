import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { VinSparePartService } from '../service/vin_sparepart.service';

@Component({
    templateUrl: './list.component.html'
})
export class VinSparePartListComponent implements OnInit {

    vin: string;
    mikey: string;
    category_one_data: any[];
    category_two_data: any[];
    category_three_data: any[];
    category_one: any;
    category_two: any;
    category_three: any;

    car_type = null;

    total: number = 0;
    page_size = 15;
    data: any[] = [];
    page_data: any[] = [];

    loading = false;

    times = 0;
    is_use = false;


    constructor(
        public msg: NzMessageService,
        private vsService: VinSparePartService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getCategoryOne();
        this.getResourceCount();
    }

    clearCarType(){
        this.car_type = null;
        this.category_one = null;
        this.category_two = null;
        this.category_three = null;
    }

    getResourceCount() {
        this.is_use = false;
        this.vsService.getResourceCount(this.is_use)
            .then(resp => {console.log(Math.floor(resp.count/2));this.times = 10 - Math.floor(resp.count/2)})
    }

    getMikey(){
        this.is_use = true;
        this.vsService.getResourceCount(this.is_use).then(resp => {
            
            if (this.times >= 1) {
                this.searchMikey()
            } else this.msg.error("非常抱歉！当天接口使用次数已用完。")
            this.times = 10 - Math.floor(resp.count/2)
        });
    }

    searchMikey(){
        
        this.vsService.getMikey(this.vin)
            .then(resp => {
                if ((resp.list[0]) && (resp.list[0].mikey)){
                    this.mikey = resp.list[0].mikey; 
                    this.car_type = resp.list[0].Manufacture_CN + "-" + resp.list[0].Vehicle_Name_CN;
                }
            })
            .then(()=> console.log(this.mikey))
            .catch(error => this.msg.error(error));
    } 

    getCategoryOne(){
        this.category_one_data = this.vsService.getCategoryOne()
    }

    getCategoryTwo(){
        this.vsService.getCategoryTwo(this.category_one,this.mikey)
            .then(resp => {console.log(resp); this.category_two_data = resp.list;})
            .catch(error => this.msg.error(error));
    }

    getCategoryThree(){
        this.vsService.getCategoryTwo(this.category_two,this.mikey)
            .then(resp => this.category_three_data = resp.list)
            .catch(error => this.msg.error(error));
    }

    _onReuseInit() {
        this.getData();
    }

    getData(){
        this.is_use = true;
        this.vsService.getResourceCount(this.is_use).then(resp => {
            
            if (this.times >= 1) {
                this.searchData();
            } else this.msg.error("非常抱歉！当天接口使用次数已用完。")
            this.times = 10 - Math.floor(resp.count/2)
        });
    }

    searchData() {
        this.page_data = [];
        this.vsService.getSparePart(this.category_three,this.mikey)
            .then(resp => {
                console.log(resp)
                if ((resp.list) && (resp.list.length)){
                    this.total = resp.list.length; 
                    this.data = resp.list; 
                    this.pageChange(1);
                }
            })
            .catch(error => this.msg.error(error));
    }

    pageChange(pi: number) {
        let start_index = this.page_size * (pi-1);
        let end_index = start_index + this.page_size -1;
        this.page_data = this.data.slice(start_index, end_index+1);
    }

}