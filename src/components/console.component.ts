import { Component, ElementRef } from '@angular/core';
import Cookie from '@/utils/cookie';
import Config from '@@/config/contianer.json';

/**
 * @file 控制台
 */

@Component({
  selector: '.app-schedulejs',
  template: `<div [class]="consoleCls" (click)="onShow()">
    <div class="schedulejs-console-title">选择环境</div>
    <span class="schedulejs-console-close" (click)="onClose()">x</span>
    <ul (click)="onEnvSelect()">
      <li data-auth="qiaoyue">qiaoyue</li>
      <li data-auth="xujiabin">xujiabin</li>
    </ul>
  </div>`
})
export default class ConsoleComponent {
  select: Element;
  consoleCls: Array<string>;

  constructor(private el: ElementRef) {
    this.consoleCls = ['schedulejs-console'];
  }

  ngOnInit() {
    const auth = Cookie.get('feweb-auth');

    const ul = this.el.nativeElement;
    console.log(ul);
  }

  onClose(e: Event) {
    e.stopImmediatePropagation();
    this.consoleCls = ['schedulejs-console', 'schedulejs-console-hide'];
  }

  onShow() {
    if (this.consoleCls.length > 1) {
      return;
    }

    this.consoleCls = ['schedulejs-console'];
  }

  onEnvSelect() {
    const auth = Cookie.get('feweb-auth');
    const newAuth = e.target.getAttribute('data-auth');

    if (!newAuth) {
      return;
    }

    if (auth !== newAuth) {
      Cookie.set('feweb-auth', newAuth);
      Cookie.set('feweb-port', Config[newAuth]);
      location.reload();
    }
  }
}
