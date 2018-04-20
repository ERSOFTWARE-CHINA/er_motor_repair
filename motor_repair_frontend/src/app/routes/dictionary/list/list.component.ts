import {Component,OnInit} from '@angular/core';

@Component({
    templateUrl: './list.component.html'
})
export class DictListComponent implements OnInit {

    constructor() { }
    
    ngOnInit() {
        
    }

    expandForm = false;
    loading = false;
    q: any = {
        pi: 1,
        ps: 10,
        sf: "name",
        sd: "desc",
        name: null,
        actived: null,
        real_name: null,
        email: null,
        position: null,
        // sorter: '',
        // status: null,
        // statusList: []
    };
    // 记录总数
    total: number;
    // 用户列表
    data: any[] = [];

    add() {
    }

    getData(){

    }

}