# <a href="https://vuejs.org" target="_blank"><img valign="text-bottom" height="49" src="https://vuejs.org/images/logo.png"></a> breadcrumbs 
 > Vue breadcrumbs builds on the official [vue-router](https://github.com/vuejs/vue-router) package to provide simple breadcrumbs. [Demo](http://inside-demo.github.io/vue-demo/#/feeds)

[![Travis Build Status](https://img.shields.io/travis/GitScrum/vue-2-breadcrumbs/master.svg?style=flat-square&label=unix)](https://travis-ci.org/GitScrum/vue-2-breadcrumbs)[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square)](https://vuejs.org/)[![node](https://img.shields.io/node/v/post-sequence.svg?maxAge=2592000&style=flat-square)]()[![npm version](https://img.shields.io/npm/v/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![Dependency Status](https://david-dm.org/gitscrum/vue-2-breadcrumbs.svg?style=flat-square)](https://david-dm.org/gitscrum/vue-2-breadcrumbs)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/GitScrum/vue-2-breadcrumbs.svg?style=flat-square)](https://coveralls.io/r/GitScrum/vue-2-breadcrumbs)

[![npm downloads](https://img.shields.io/npm/dm/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![npm](https://img.shields.io/npm/dt/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)

## Install

```bash
$ npm install vue-2-breadcrumbs
```

> **Note:** This project is compatible with node v4+


## Usage

### Bundler (Webpack, Rollup)
```js
import Vue from 'vue';
import Breabcrumbs from 'vue-2-breadcrumbs';

Vue.use(Breabcrumbs);
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-2-breadcrumbs/dist/vue-2-breadcrumbs.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-2-breadcrumbs.js"></script>
```

## Example  
```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBreadcrumbs from 'vue-2-breadcrumbs';

Vue.use(VueRouter);
Vue.use(VueBreadcrumbs);

const Feeds = {template: '<div><router-view/></div>'};
const Feed = {template: '<div><h2>Feed</h2></div>'};
const Biz = {template: '<div><h2>Biz</h2></div>'};
const Foo = {template: '<div><h2>Foo</h2></div>'};
const Bar = {template: '<div><h2>Bar</h2></div>'};

const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/feeds'},
        {
            path: '/feeds',
            component: Feeds,
            meta: {
                breadcrumb: 'Feeds'
            },
            children: [
                {
                    path: '',
                    component: Biz
                },
                {
                    path: 'foo',
                    component: Foo,
                    meta: {
                        breadcrumb: () => `foo ${1 + 1}`
                    }
                },
                {
                    path: 'bar',
                    component: Bar,
                    meta: {
                        breadcrumb: 'bar'
                    }
                },
                {
                    path: ':id',
                    component: Feed,
                    meta: {
                        breadcrumb: (routeParams) => `Other Feed ${routeParams.id}`
                    }
                }
            ]
        }
    ]
});

new Vue({
    router,
    template: `
        <div id="app" class="container">
            <ul class="nav">
                <li class="nav-item  dropdown">
                    <router-link to="/feeds" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Feeds</router-link>
                    <div class="dropdown-menu">
                        <router-link to="/feeds/foo" class="dropdown-item">Foo</router-link>
                        <router-link to="/feeds/bar" class="dropdown-item">Bar</router-link>
                        <router-link to="/feeds/1" class="dropdown-item">Other Feed 1</router-link>
                        <router-link to="/feeds/2" class="dropdown-item">Other Feed 2</router-link>
                        <router-link to="/feeds/3" class="dropdown-item">Other Feed 3</router-link>
                    </div>
                </li>
            </ul>
            <breadcrumbs/>
            <router-view/>
        </div>
    `
}).$mount('#app');
```
## License

> MIT License (MIT)

> Copyright (c) Ivan Demidov <scrum@list.ru>

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
