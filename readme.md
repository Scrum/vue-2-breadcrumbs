# <a href="https://vuejs.org" target="_blank"><img valign="text-bottom" height="49" src="https://vuejs.org/images/logo.png"></a> breadcrumbs 
> Vue breadcrumbs builds on the official [vue-router](https://github.com/vuejs/vue-router) package to provide simple breadcrumbs. [Demo](https://scrum.github.io/vue-2-breadcrumbs/)

[![Travis Build Status](https://img.shields.io/travis/Scrum/vue-2-breadcrumbs/master.svg?style=flat-square&label=unix)](https://travis-ci.org/Scrum/vue-2-breadcrumbs)[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square)](https://vuejs.org/)[![node](https://img.shields.io/node/v/post-sequence.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![Dependency Status](https://david-dm.org/scrum/vue-2-breadcrumbs.svg?style=flat-square)](https://david-dm.org/scrum/vue-2-breadcrumbs)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/vue-2-breadcrumbs.svg?style=flat-square)](https://coveralls.io/r/Scrum/vue-2-breadcrumbs)

[![npm downloads](https://img.shields.io/npm/dm/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)[![npm](https://img.shields.io/npm/dt/vue-2-breadcrumbs.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-breadcrumbs)

## Install

```bash
$ npm install vue-2-breadcrumbs
```

> **Note:** This project is compatible with node v10+


## Usage

**`main.js`**
```js
import Vue from 'vue';
import VueBreadcrumbs from 'vue-2-breadcrumbs';
import App from './App.vue';

Vue.use(VueBreadcrumbs);

new Vue({
  el: '#app',
  render (h) {
    return h(App)
  }
});
```
**`App.vue`**
```html
<template>
  <div id="app">
    <Breadcrumbs/>
  </div>
</template>
```

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
