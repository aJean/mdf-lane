import { Component, ElementRef } from '@angular/core';
import ConsoleService from '@/services/console.service';
import Cookie from '@/utils/cookie';
import Config from '@@/config/contianer.json';

/**
 * @file 控制台
 */

@Component({
  selector: '.app-schedulejs',
  template: `<mat-expansion-panel class="schedulejs-console" [expanded]="true" hideToggle>
    <mat-expansion-panel-header>
      <mat-panel-title>
        <mat-icon>cloud_circle</mat-icon>Shedulejs - 控制台
      </mat-panel-title>
    </mat-expansion-panel-header>
    <mat-toolbar color="primary">
      <mat-toolbar-row>Env: {{ env.auth }} - {{ env.port }}</mat-toolbar-row>
    </mat-toolbar>
    <mat-divider></mat-divider>
    <mat-selection-list (selectionChange)="onEnvSelect($event)">
      <mat-list-option *ngFor="let user of users" [value]="user.name"
        [selected]="user.name == auth">
        <p matLine>{{ user.name }}</p>
      </mat-list-option>
    </mat-selection-list>
  </mat-expansion-panel>`
})
export default class ConsoleComponent {
  select: Element;
  // 有权限的用户
  auth: string;
  users: Array<any>;
  env: Object = {};

  constructor(private el: ElementRef, private consoleService: ConsoleService) {
    this.auth = Cookie.get('feweb-auth');
    this.users = this.consoleService.getUsers();

    consoleService.getEnv().subscribe((data) => {
      this.env = data;
    });
  }

  ngOnInit() {
    const selectNode = this.el.nativeElement.querySelector(`li[data-auth="${this.auth}"]`);

    if (selectNode) {
      this.select = selectNode;
    }
  }

  /**
   * 真 tm 难用
   */
  onEnvSelect(e) {
    e.option.selectionList.deselectAll();
    e.option.selected = true;

    const auth = Cookie.get('feweb-auth');
    const newAuth = e.option.value;

    if (!newAuth) {
      return;
    }

    if (auth !== newAuth) {
      Cookie.set('feweb-auth', newAuth);
      Cookie.set('feweb-port', Config[newAuth]);
      // 选择了新环境，刷新加载
      location.reload();
    }
  }
}
