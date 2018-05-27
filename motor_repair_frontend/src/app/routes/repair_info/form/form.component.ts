import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject }           from 'rxjs/Subject';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';

import { RepairInfoService } from '../service/repair_info.service';
import { SparepartService } from '../../sparepart/service/sparepart.service';
import { CarMessageService } from '../../carMessage/service/carMessage.service';
import { RepairInfo } from '../domain/repair_info.domain'; 
import { CarMessage } from '../../carMessage/domain/carMessage.domain';
// import { stringToDate} from '../../../../utils/utils';
@Component({
    selector: 'repair_info-form',
    templateUrl: './form.component.html'
})
export class RepairInfoFormComponent implements OnInit {
    editIndex = -1;
    editIndex2 = -1;
    editObj = {};
    editObj2 = {};

    form: FormGroup;
    
    carMessage: CarMessage;
    repairInfo: RepairInfo;
    title: string = '';

    options: string[] = ["保养","维修"]

    status_options: any[] = [{label: "已开单", value: false}, {label: "已完结", value: true}]

    // 新增配件保存的同时需要自动填充配件名字段，该参数用来临时记录parts_cost列表中的索引
    parts_cost_i = null
    parts_name = null

    // 是否可以修改
    disabled = false


    constructor(
        private fb: FormBuilder, 
        private router: Router, 
        private mrSrv: RepairInfoService,
        private spSrv: SparepartService,
        private carMessageSrv: CarMessageService, 
        private msg: NzMessageService,
        private reuseTabService: ReuseTabService,
        private modalSrv: NzModalService) {}

    ngOnInit() {
        let op = this.mrSrv.formOperation;
        if (op == 'create') this.initCreate();
        if (op == 'update') this.initUpdate();
        this.form = this.fb.group({
            no: [this.repairInfo? this.repairInfo.no : '', [Validators.required, ,Validators.minLength(4),
                                                              Validators.pattern('[\u4E00-\u9FA5-a-zA-Z0-9_]*$') ]],
            type: [this.repairInfo? this.repairInfo.type : null, [Validators.required]],
            status: [this.repairInfo? this.repairInfo.status : false],
            // time_cost: [this.repairInfo? this.repairInfo.time_cost : 0, [Validators.required, this.validateNumber]],
            consultant : [this.repairInfo? this.repairInfo.consultant : null],
            entry_date : [this.repairInfo? this.repairInfo.entry_date : new Date()],
            return_date : [this.repairInfo? this.repairInfo.return_date : null],
            // type : [this.repairInfo? this.repairInfo.items : null],
            customer_comment : [this.repairInfo? this.repairInfo.customer_comment : null],
            repairman_comment : [this.repairInfo? this.repairInfo.repairman_comment : null],
            advise : [this.repairInfo? this.repairInfo.advise : null],
            mileage : [this.repairInfo? this.repairInfo.mileage : null, [Validators.required, this.validateNumber]],
            next_mileage : [this.repairInfo? this.repairInfo.next_mileage : null, [this.validateNumber]],
            next_date : [this.repairInfo? this.repairInfo.next_date : null],
            agent : [this.repairInfo? this.repairInfo.agent : (this.carMessage? this.carMessage.owner_name: null)],
            agent_mobile : [this.repairInfo? this.repairInfo.agent_mobile : (this.carMessage? this.carMessage.phone_num: null)],
            parts_cost: this.fb.array([]),
            time_cost: this.fb.array([]),
            // 车辆信息，仅作为显示
            carMessage_plate_num: [this.carMessage? this.carMessage.plate_num: null],
            carMessage_car_type: [this.carMessage? this.carMessage.car_type: null],
            carMessage_vin: [this.carMessage? this.carMessage.vin: null],
            carMessage_engine_num: [this.carMessage? this.carMessage.engine_num: null],
            carMessage_owner_name: [this.carMessage? this.carMessage.owner_name: null],
            carMessage_phone_num: [this.carMessage? this.carMessage.phone_num: null],
        });
        this.init_sparepart_form();
        this.getSparepart();

        // this.searchModels.debounceTime(400)
        //     .map(model => {this.getSparepart()}).subscribe();

        if (op == 'update'){

            this.repairInfo.parts_cost? this.repairInfo.parts_cost.forEach(i => {
                const field = this.createPartsCost();
                field.patchValue(i);
                this.parts_cost.push(field);
            }) : console.log("no parts_cost.");

            this.repairInfo.time_cost? this.repairInfo.time_cost.forEach(i => {
                const field = this.createTimeCost();
                field.patchValue(i);
                this.time_cost.push(field);
            }) : console.log("no time_cost.");
        
        }


    }

    createPartsCost(): FormGroup {
        return this.fb.group({
            name: [ null, [ Validators.required ] ],
            amount: [ null, [ Validators.required, this.validateNumber ] ],
            unit_price: [ null, [ Validators.required, this.validateNumber ] ],
            total: [ null, [ Validators.required, this.validateNumber ] ]
        });
    }

    createTimeCost(): FormGroup {
        return this.fb.group({
            name: [ null, [ Validators.required ] ],
            total: [ null, [ Validators.required, this.validateNumber ] ]
        });
    }

    // 获取备件信息
    spareparts: any[];
    //搜索框ngModel，用于后台多字段查询备件
    // model: string = "";
    //每当在输入框输入时（keyup），向流中发送搜索model
    // private searchModels = new Subject<any>();
    // search_sparepart(): void {
    //     this.searchModels.next(this.model);
    // }
    getSparepart(){
        this.spSrv.listAll().then(resp => this.spareparts = resp.data).then(resp => console.log(this.spareparts))
    }

    get parts_cost() { return this.form.controls.parts_cost as FormArray; }
    get time_cost() { return this.form.controls.time_cost as FormArray; }
    
    add() {
        this.parts_cost.push(this.createPartsCost());
        this.edit(this.parts_cost.length - 1);
    }

    del(index: number) {
        this.parts_cost.removeAt(index);
    }

    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.parts_cost.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.parts_cost.at(index).value };
        this.editIndex = index;
    }

    save(index: number) {
        this.parts_cost.at(index).markAsDirty();
        if (this.parts_cost.at(index).invalid) return;
        this.editIndex = -1;
    }

    cancel(index: number) {
        if (!this.parts_cost.at(index).value.key) {
            this.del(index);
        } else {
            this.parts_cost.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }

    add_time_cost() {
        this.time_cost.push(this.createTimeCost());
        this.edit_time_cost(this.time_cost.length - 1);
    }

    del_time_cost(index: number) {
        this.time_cost.removeAt(index);
    }

    edit_time_cost(index: number) {
        if (this.editIndex2 !== -1 && this.editObj2) {
            this.time_cost.at(this.editIndex2).patchValue(this.editObj2);
        }
        this.editObj2 = { ...this.time_cost.at(index).value };
        this.editIndex2 = index;
    }

    save_time_cost(index: number) {
        this.time_cost.at(index).markAsDirty();
        if (this.time_cost.at(index).invalid) return;
        this.editIndex2 = -1;
    }

    cancel_time_cost(index: number) {
        if (!this.time_cost.at(index).value.key) {
            this.del_time_cost(index);
        } else {
            this.time_cost.at(index).patchValue(this.editObj2);
        }
        this.editIndex2 = -1;
    }

    // 明细中计算总价
    countTotal(i){
        // console.log(this.parts_cost.at(i)["controls"])
        if (!this.parts_cost.at(i)["controls"]["unit_price"].invalid && !this.parts_cost.at(i)["controls"]["amount"].invalid)
        this.parts_cost.at(i)["controls"]["total"].setValue(this.parts_cost.at(i)["controls"]["unit_price"].value * this.parts_cost.at(i)["controls"]["amount"].value)
    }

    _submitForm() {
        for (const i in this.form.controls) {
          this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) {console.log(this.form.controls);return} ;
        if (this.form.valid) {
            this.formatForm() 
            let op = this.mrSrv.formOperation;
            if (op == 'create') this.mrSrv.add(this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建维修单 ' + resp.data.no + ' 成功！');
                }
                this.goBack()}).catch(error => this.msg.error(error));
            if (op == 'update') this.mrSrv.update(this.repairInfo.id, this.form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('更新维修单 ' + resp.data.no + ' 成功！');
                }
                this.goBack();}).catch(error => this.msg.error(error));
            
        }
        
    }

    // 完工点击事件
    complete() {
        this.form.value.status = true;
        this._submitForm();
    }

    goBack() {
        this.router.navigateByUrl('/dashboard/v1');
    }

    initCreate() {
        this.disabled = false;
        this.reuseTabService.title ="创建维修信息"; 
        this.carMessage = this.mrSrv.carMessage;
        this.title = "创建维修信息"
        this.mrSrv.generateNo().then(resp => {
            if (resp.ok) this.form.controls["no"].setValue(resp.ok) 
            if (resp.error) this.form.controls["no"].setValue("generate no failed.") 
        })
    }

    initUpdate() {
        this.reuseTabService.title ="修改维修信息"; 
        // this.carMessage = this.mrSrv.carMessage;
        this.carMessageSrv.initUpdate(this.mrSrv.repairInfo.car_message_id)
                          .then(resp => this.carMessage = resp.data)
                          .then(resp => {console.log('geted carmessage');console.log(this.carMessage)})
        
        this.title = "修改维修信息"
        this.repairInfo = this.mrSrv.repairInfo;
        this.disabled = this.repairInfo.status
        console.log(this.repairInfo)
    }

    formatForm() {
        
        // 根据后端格式，重新组装parts_cost参数
        let parts_cost = [];
        let form_parts_cost = this.form.controls["parts_cost"].value;
        for (const i in form_parts_cost) {
            let v = form_parts_cost[i]
            parts_cost.push(v)
        }
        // this.form.controls["parts_cost"].setValue(parts_cost);
        this.form.value.parts_cost = parts_cost;

        // 根据后端格式，重新组装time_cost参数
        let time_cost = [];
        let form_time_cost = this.form.controls["time_cost"].value;
        for (const i in form_time_cost) {
            let v = form_time_cost[i]
            time_cost.push(v)
        }
        // this.form.controls["parts_cost"].setValue(parts_cost);
        this.form.value.time_cost = time_cost;
    }

    //数字验证
    validateNumber(c: FormControl) {
        if (c.value == null || c.value == "") return null
        return c.value > 0 ? null : {validateNumber: true}
    };



    // 创建备件弹窗
    confirmContent = ""
    modalVisible = false;
    sparepart_form: FormGroup;

    showModal = () => {
        this.modalVisible = true;
    }

    handleOk = (e) => {
        for (const i in this.sparepart_form.controls) {
            this.sparepart_form.controls[ i ].markAsDirty();
        }
        if (this.sparepart_form.valid) {
            this.spSrv.add(this.sparepart_form.value).then(resp => {
                if (resp.error) { 
                    this.msg.error(resp.error);
                } else {
                    this.msg.success('创建备件 ' + resp.data.name + ' 成功！');
                    this.modalVisible = false;
                    this.init_sparepart_form();
                    // console.log("push and set value")
                    // console.log(resp.data.name + (resp.data.specifications? ':'+resp.data.specifications : ''))
                    this.spareparts.push(resp.data);
                    this.parts_cost.controls[this.parts_cost_i]["controls"]["name"].setValue(resp.data.name + (resp.data.specifications? ':'+resp.data.specifications : ''))
                    this.parts_cost.controls[this.parts_cost_i]["controls"]["unit_price"].setValue(resp.data.price)
                }}).then(resp => this.getSparepart()).catch(error => this.msg.error(error));
        }
    }

    handleCancel = (e) => {
        this.modalVisible = false;
        this.init_sparepart_form();
    }

    add_sparepart(index){
        this.modalVisible = true;
        this.parts_cost_i = index;
        // console.log(this.parts_cost.controls[index]["controls"]["name"].setValue)
    }

    init_sparepart_form() {
        this.sparepart_form = this.fb.group({
            name: [null, [Validators.required]],
            specifications: [null, [Validators.required]],
            price: [null, [Validators.required, this.validateNumber]]
        });
    }
    
}