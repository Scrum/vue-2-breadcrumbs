export default {
	install(Vue) {
		Object.defineProperties(Vue.prototype, {
			$breadcrumbs: {
				get() {
					return this.$route.matched;
				}
			}
		});

		Vue.component('breadcrumbs', {
			methods: {
				getBreadcrumb: function (bc) {
					return typeof bc === 'function' ? bc() : bc;
				}
			},
			template: `
				<ol class="breadcrumb" v-if="$breadcrumbs.length">
					<li class="breadcrumb-item" v-if="crumb.meta.breadcrumb" v-for="(crumb, i) in $breadcrumbs">
						<router-link active-class="active" :to="{ path: crumb.path }" :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>
					</li>
				</ol>
				`
		});
	}
};
