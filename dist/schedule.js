(function () {
  'use strict';

  /**
   * @file js-cookie
   */
  function extend(...args) {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
          var attributes = arguments[i];
          for (var key in attributes) {
              result[key] = attributes[key];
          }
      }
      return result;
  }
  function decode(s) {
      return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  function api() { }
  function set(key, value, attributes = {}) {
      if (typeof document === 'undefined') {
          return;
      }
      attributes = extend({ path: '/' }, api.defaults, attributes);
      if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      // We're using "expires" because "max-age" is not supported by IE
      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';
      try {
          var result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
              value = result;
          }
      }
      catch (e) { }
      value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key))
          .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
          .replace(/[\(\)]/g, escape);
      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
              continue;
          }
          stringifiedAttributes += '; ' + attributeName;
          if (attributes[attributeName] === true) {
              continue;
          }
          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }
      return (document.cookie = key + '=' + value + stringifiedAttributes);
  }
  function get(key, json) {
      if (typeof document === 'undefined') {
          return;
      }
      var jar = {};
      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var i = 0;
      for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');
          if (!json && cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
          }
          try {
              var name = decode(parts[0]);
              cookie = decode(cookie);
              if (json) {
                  try {
                      cookie = JSON.parse(cookie);
                  }
                  catch (e) { }
              }
              jar[name] = cookie;
              if (key === name) {
                  break;
              }
          }
          catch (e) { }
      }
      return key ? jar[key] : jar;
  }
  api.set = set;
  api.get = function (key) {
      return get(key, false /* read as raw */);
  };
  api.getJSON = function (key) {
      return get(key, true /* read as json */);
  };
  api.remove = function (key, attributes) {
      set(key, '', extend(attributes, {
          expires: -1
      }));
  };
  api.defaults = {};

  var qiaoyue = 8081;
  var xujiabin = 8082;
  var Config = {
  	qiaoyue: qiaoyue,
  	xujiabin: xujiabin
  };

  /**
   * @file 控制台
   */
  const Panel = Object.create({
      select: null,
      create() {
          const auth = api.get('feweb-auth');
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
      onclick(e) {
          const auth = api.get('feweb-auth');
          const newAuth = e.target.getAttribute('data-auth');
          if (!newAuth) {
              return;
          }
          if (auth !== newAuth) {
              api.set('feweb-auth', newAuth);
              api.set('feweb-port', Config[newAuth]);
              location.reload();
          }
      },
      init() {
          this.onClose = this.onClose.bind(this);
          this.onShow = this.onShow.bind(this);
      },
      onClose(e) {
          e.stopImmediatePropagation();
          this.root.className += ' schedulejs-console-hide';
          this.root.onclick = this.onShow;
      },
      onShow() {
          console.log(this);
          this.root.className = 'schedulejs-console';
          this.root.onclick = null;
      }
  });
  Panel.init();

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".schedulejs-console {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  width: 300px;\n  border-radius: 4px;\n  border: 1px solid #ebeef5;\n  color: #999;\n  box-shadow: 10px 10px 5px #d8d9da;\n  user-select: none;\n}\n.schedulejs-console .schedulejs-console-title {\n  padding: 18px 20px;\n  border-bottom: 1px solid #ebeef5;\n}\n.schedulejs-console .schedulejs-console-close {\n  position: absolute;\n  right: 10px;\n  top: 15px;\n  width: 30px;\n  height: 30px;\n  text-align: center;\n  font-size: 20px;\n  color: #409eff;\n  cursor: pointer;\n}\n.schedulejs-console .schedulejs-console-close:hover {\n  opacity: 0.6;\n}\n.schedulejs-console ul {\n  list-style: none;\n}\n.schedulejs-console li {\n  margin-bottom: 10px;\n  cursor: pointer;\n}\n.schedulejs-console li:hover {\n  color: #297be7;\n}\n.schedulejs-console .schedulejs-console-select {\n  color: #297be7;\n}\n.schedulejs-console-hide {\n  width: 38px;\n  height: 38px;\n  border-radius: 20px;\n  overflow: hidden;\n  cursor: pointer;\n}\n.schedulejs-console-hide .schedulejs-console-close {\n  display: none;\n}\n.schedulejs-console-hide::after {\n  position: fixed;\n  top: 20px;\n  right: 20px;\n  width: 40px;\n  height: 40px;\n  border-radius: 20px;\n  content: \"\";\n  background: rgba(169, 247, 169, 0.7);\n}\n";
  styleInject(css_248z);

  /**
   * @file schedulejs - change cookie to proxy container
   */
  const node = Panel.create();
  document.body.appendChild(node);

}());
