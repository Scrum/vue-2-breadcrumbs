import test from 'ava';
import VueBreadcrumbs, {VueBreadcrumbsPlugin} from '../src';

test('default export should be a function', t => {
  t.true(VueBreadcrumbs instanceof Function);
});

test('named export `VueBreadcrumbsPlugin` should be a function', t => {
  t.true(VueBreadcrumbsPlugin instanceof Function);
});
