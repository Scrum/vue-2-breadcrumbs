# <a href="https://vuejs.org" target="_blank"><img valign="text-bottom" height="49" src="https://vuejs.org/images/logo.png"></a> breadcrumbs 
> Vue breadcrumbs builds on the official [vue-router](https://github.com/vuejs/vue-router) package to provide simple breadcrumbs. [Demo](https://scrum.github.io/vue-2-breadcrumbs/)

[![Actions Status](https://github.com/Scrum/vue-2-breadcrumbs/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/Scrum/vue-2-breadcrumbs/actions?query=workflow%3A%22CI+tests%22)[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square)](https://vuejs.org/)[![node](https://img.shields.io/node/v/post-sequence.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![Dependency Status](https://david-dm.org/scrum/vue-2-breadcrumbs.svg?style=flat-square)](https://david-dm.org/scrum/vue-2-breadcrumbs)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/vue-2-breadcrumbs.svg?style=flat-square)](https://coveralls.io/r/Scrum/vue-2-breadcrumbs)

[![npm downloads](https://img.shields.io/npm/dm/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![npm](https://img.shields.io/npm/dt/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)

## Support
- Support SSR
- Setting parent route without need to actually nest it in children array
- Customized template
- Dynamic breadcrumbs 
- Dynamic label 
- Shorthand labeling (`breadcrumb: 'Page Label'`)
- Sub-routing


## Install

```bash
$ npm install vue-2-breadcrumbs
```

> **Note:** This project is compatible with node v10+


## Usage

```js
import Vue from 'vue';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import App from './App.vue';

Vue.use(VueBreadcrumbs);
```
> Note: After that `<Breadcrumbs/>` component would be at your disposal.

## Meta in router
```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: { template: '<h2>Home</h2>' },
      meta: {
        breadcrumb: 'Home'
      }
    },
    {
      path: '/params',
      name: 'Params',
      component: { template: '<h2>Params</h2>' },
      meta: {
        breadcrumb: routeParams => `route params id: ${routeParams.id}`
      }
    },
    {
      path: '/context',
      name: 'Context',
      component: { template: '<h2>Context</h2>' },
      meta: {
        breadcrumb() {
            const { name } = this.$route;
            return `name "${name}" of context route`;
        }
      }
    },
    {
      path: '/parent',
      component: { template: '<router-view/>' },
      meta: {
        breadcrumb: {
          label: 'Parent to Params',
          parent: 'Params'
        }
      },
    }
  ]
});
```
## Options
> An options object can also be passed into the plugin to specify your own template and rendering methods if desired. For example:

```js
import Vue from 'vue';
import VueBreadcrumbs from 'vue-2-breadcrumbs';

Vue.use(VueBreadcrumbs, {
  template:
    '        <nav v-if="$breadcrumbs.length" aria-label="breadcrumb">\n' +
    '            <ol class="breadcrumb">\n' +
    '                <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" class="breadcrumb-item active" aria-current="page">\n' +
    '                    <router-link :to="{ path: getPath(crumb) }">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
    '                </li>\n' +
    '            </ol>\n' +
    '        </nav>'
});
```
