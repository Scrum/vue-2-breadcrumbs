import test from 'ava';
import VueBreadcrumbs from '../lib/vue-2-breadcrumbs.common';

test('default export should be a function', t => {
  t.true(VueBreadcrumbs.install instanceof Function);
});
