import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @file console data service
 */

@Injectable({
  providedIn: 'root'
})
export default class ConsoleService {
  userList: Array<any>;

  constructor(private http: HttpClient) {
    this.userList = [{ name: 'qiaoyue' }, { name: 'xujiabin' }];
  }

  getUsers() {
    return this.userList;
  }

  /**
   * 获取容器环境信息
   */
  getEnv() {
    return this.http.get('/feweb/env.json', { responseType: 'json' });
  }
}
