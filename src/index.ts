import 'core-js/features/reflect'; // injector needs reflect
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './components/app.module';
import './style.less';

/**
 * @file schedulejs - change cookie to proxy container
 */

if (!document.body.querySelector('.app-schedulejs')) {
  const root = document.createElement('div');
  root.className = 'app-schedulejs';
  document.body.appendChild(root);
}

platformBrowserDynamic().bootstrapModule(AppModule);
