import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userStatusPipe' })
export class UserStatusPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value) return "已激活" ;
    if (!value) return "未激活"; 
  }
}