import { Component, ElementRef } from '@angular/core';
import Cookie from '@/utils/cookie';
import Config from '@@/config/contianer.json';
import ConsoleService from '@/services/console.service';

/**
 * @file 控制台
 */

@Component({
  selector: '.app-schedulejs',
  template: `<div [ngClass]="classes" (click)="onShow()">
    <div class="schedulejs-console-title">选择环境</div>
    <span class="schedulejs-console-close" (click)="onClose($event)">x</span>
    <ul (click)="onEnvSelect($event)">
      <li *ngFor="let user of users" [attr.data-auth]="user.name" [class.schedulejs-console-select]="user.name == auth">
        {{ user.name }}
      </li>
    </ul>
  </div>`
})
export default class ConsoleComponent {
  select: Element;
  // 有权限的用户
  auth: string;
  users: Array<any>;
  classes: Array<string>;

  constructor(private el: ElementRef, private consoleService: ConsoleService) {
    this.auth =  Cookie.get('feweb-auth');
    this.classes = ['schedulejs-console'];
    this.users = this.consoleService.getUsers();
  }

  ngOnInit() {
    const selectNode = this.el.nativeElement.querySelector(`li[data-auth="${this.auth}"]`);

    if (selectNode) {
      this.select = selectNode;
    }
  }

  onClose(e) {
    e.stopImmediatePropagation();
    this.classes = ['schedulejs-console', 'schedulejs-console-hide'];
  }

  onShow() {
    if (this.classes.length <= 1) {
      return;
    }

    this.classes = ['schedulejs-console'];
  }

  onEnvSelect(e) {
    const auth = Cookie.get('feweb-auth');
    const newAuth = e.target.getAttribute('data-auth');

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
