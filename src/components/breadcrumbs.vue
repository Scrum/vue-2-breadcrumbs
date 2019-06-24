<script>
export default {
    name:"breadcrumbs",
    methods: {
        getBreadcrumb(bc) {
            return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
        },
        getPath(crumb) {
            let {path} = crumb;

            for (let [key, value] of Object.entries(this.$route.params)) {
                path = path.replace(`:${key}`, value);
            }

            return path;
        }
    },
    template: `
        <ol
            class="breadcrumb"
            v-if="$breadcrumbs.length"
        >
            <li
                class="breadcrumb-item"
                v-if="crumb.meta.breadcrumb"
                v-for="(crumb, i) in $breadcrumbs"
                :key="i"
            >
                <router-link
                    active-class="active"
                    :to="{ path: getPath(crumb) }"
                    :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'"
                >
                    {{ getBreadcrumb(crumb.meta.breadcrumb) }}
                </router-link>
            </li>
        </ol>`
}
</script>
