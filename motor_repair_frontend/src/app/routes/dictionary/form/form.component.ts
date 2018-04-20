import {Component,OnInit} from '@angular/core';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';

@Component({
    templateUrl: './form.component.html'
})
export class DictFormComponent implements OnInit {

    constructor(private reuseTabService: ReuseTabService) {
        this.reuseTabService.title ="数据字典表单" 
    }
    
    ngOnInit() {
        
    }
}