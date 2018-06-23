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

    total: number;
    page_size = 20;
    data: any[] = [];

    loading = false;

    constructor(
        public msg: NzMessageService,
        private vsService: VinSparePartService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getCategoryOne();
        // this.getData();
    }

    getMikey(){
        this.vsService.getMikey(this.vin)
            .then(resp => this.mikey = resp.list[0].mikey).then(resp => console.log(this.mikey))
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

    getData() {
        this.vsService.getSparePart(this.category_three,this.mikey)
            .then(resp => {console.log(resp); this.data = resp.list})
            .catch(error => this.msg.error(error));
    }

    pageChange(pi: number) {
        this.getData();
    }

}