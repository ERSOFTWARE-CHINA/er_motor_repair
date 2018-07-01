import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { RepairInfoService } from '../../repair_info/service/repair_info.service';
import { CarMessageService } from '../../carMessage/service/carMessage.service';

@Component({
  selector: 'app-pages-bill',
  templateUrl: './bill.component.html'
})
export class BillComponent {

    constructor(private repairInfoService: RepairInfoService, private carMessageSrv: CarMessageService) {

    }

    repair_info: any;
    carMessage: any;

    ngOnInit() {
        this.initInfo();     
    }

    initInfo() {
        this.repair_info = this.repairInfoService.repairInfo;
        this.carMessageSrv.initUpdate(this.repairInfoService.repairInfo.car_message_id)
                          .then(resp => this.carMessage = resp.data)
                          .catch(error => console.log(error))
    }

}