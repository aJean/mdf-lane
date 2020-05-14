import { Injectable } from '@angular/core';

/**
 * @file console data service
 */

@Injectable({
  providedIn: 'root'
})
export default class ConsoleService {
  userList: Array<any>;

  constructor() {
    this.userList = [{ name: 'qiaoyue' }, { name: 'xujiabin' }];
  }

  getUsers() {
    return this.userList;
  }
}
