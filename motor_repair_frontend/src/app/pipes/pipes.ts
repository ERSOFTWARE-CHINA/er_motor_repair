import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userStatusPipe' })
export class UserStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已激活" ;
    if (!value) return "未激活"; 
  }
}

@Pipe({ name: 'staffStatusPipe' })
export class StaffStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "在岗" ;
    if (!value) return "离职"; 
  }
}

@Pipe({ name: 'sexPipe' })
export class SexPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "男" ;
    if (!value) return "女"; 
  }
}

@Pipe({ name: 'repairInfoStatusPipe' })
export class RepairInfoStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已完成" ;
    if (!value) return "已开单"; 
  }
}