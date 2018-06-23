import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { RepairInfoService } from '../../repair_info/service/repair_info.service';

@Component({
  selector: 'app-pages-bill',
  templateUrl: './bill.component.html'
})
export class BillComponent {

    constructor(private repairInfoService: RepairInfoService) {

    }

    repair_info: any;

    ngOnInit() {
        this.repair_info = this.repairInfoService.repairInfo;
    }

}