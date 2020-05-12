import Cookie from './utils/cookie';
import Config from '../config/contianer.json';

/**
 * @file 控制台
 */

const Panel = Object.create({
  select: null,

  create() {
    const auth = Cookie.get('feweb-auth');
    const node = (this.root = document.createElement('div'));

    node.onclick = this.onclick;
    node.className = 'schedulejs-console';
    node.innerHTML = `<div class="schedulejs-console-title">选择环境</div>
      <span class="schedulejs-console-close">x</span>
      <ul>
        <li data-auth="qiaoyue">qiaoyue</li>
        <li data-auth="xujiabin">xujiabin</li>
      </ul>
    `;

    const selectNode = node.querySelector(`li[data-auth="${auth}"]`);
    if (selectNode) {
      this.select = selectNode;
      selectNode.className = 'schedulejs-console-select';
    }

    node.querySelector('.schedulejs-console-close')['onclick'] = this.onClose;

    return node;
  },

  onclick(e: any) {
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
  },

  init() {
    this.onClose = this.onClose.bind(this);
    this.onShow = this.onShow.bind(this);
  },

  onClose(e: Event) {
    e.stopImmediatePropagation();
    
    this.root.className += ' schedulejs-console-hide';
    this.root.onclick = this.onShow;
  },

  onShow() {
    console.log(this)

    this.root.className = 'schedulejs-console';
    this.root.onclick = null;
  }
});

Panel.init();

export default Panel;
