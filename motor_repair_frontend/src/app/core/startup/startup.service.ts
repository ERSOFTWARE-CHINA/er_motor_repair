import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { I18NService } from '../i18n/i18n.service';

import { ReuseTabService,ReuseTabMatchMode } from '@delon/abc';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private translate: TranslateService,
        private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private injector: Injector,
        private reuseTabService: ReuseTabService) { 
            // 设置reusetab，对URL有效，且不重用以form结尾的URL
            this.reuseTabService.mode=ReuseTabMatchMode.URL
            this.reuseTabService.excludes = [/form$/]
        }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            zip(
                this.httpClient.get(`assets/i18n/${this.i18n.defaultLang}.json`),
                this.httpClient.get('assets/app-data.json')
            ).pipe(
                // 接收其他拦截器后产生的异常消息
                catchError(([langData, appData]) => {
                    resolve(null);
                    return [langData, appData];
                })
            ).subscribe(([langData, appData]) => {
                // setting language data
                this.translate.setTranslation(this.i18n.defaultLang, langData);
                this.translate.setDefaultLang(this.i18n.defaultLang);

                // application data
                const res: any = appData;
                // 应用信息：包括站点名、描述、年份
                this.settingService.setApp(res.app);
                // 用户信息：包括姓名、头像、邮箱地址
                this.settingService.setUser(res.user);
                // ACL：设置权限ACL
                this.aclService.setFull(false);
                let aclStr = localStorage.getItem('acl');
                let aclArr = aclStr? aclStr.split(','): [];
                this.aclService.setRole(aclArr);
                this.menuService.resume();
                // 初始化菜单
                this.menuService.add(res.menu);
                // 设置页面标题的后缀
                this.titleService.suffix = res.app.name;
            },
            () => { },
            () => {
                resolve(null);
            });
        });
    }
}
