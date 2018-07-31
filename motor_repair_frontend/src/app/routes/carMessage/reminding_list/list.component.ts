import {Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap } from 'rxjs/operators';

import { CarMessageService } from '../../carMessage/service/carMessage.service';
import { UserStatusPipe } from '../../../pipes/pipes'; 

@Component({
    selector: 'carMessage-list',
    templateUrl: './list.component.html'
})
export class CarMessageRemindingListComponent implements OnInit {

    q: any = {
        time_difference: "182"
    };
    
    // 车辆信息列表
    data: any[] = [];
    

    loading = false;

    

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private carMessageService: CarMessageService,
        private router: Router
        ) {}

    ngOnInit() {
        this.getData();
    }

    _onReuseInit() {
        this.getData();
    }

    getData() {
        console.log("q is###")
        console.log(this.q)
        this.formatForm()
        this.loading = true;
        this.carMessageService.listAllReminding(this.q)
                         .then(resp => {
                             if (resp.error) {
                                
                                this.msg.error(resp.error);
                                this.loading = false;
                             } else {

                                this.data = resp; 
                                this.loading = false;
                             }
                         })
                         .catch((error) => {this.msg.error(error); this.loading = false;})
    }

    formatForm() {
        
        if ((this.q.time_difference == null)||(this.q.time_difference == "")){delete this.q.time_difference}
    }
}