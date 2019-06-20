<script>
export default {
    name:"breadcrumbs",
    methods: {
        getBreadcrumb(bc) {
            return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
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
                :key="crumb"
            >
                <router-link
                    active-class="active"
                    :to="{ path: crumb.path }"
                    :tag="i != $breadcrumbs.length - 1 ? 'a' : 'span'"
                >
                    {{ getBreadcrumb(crumb.meta.breadcrumb) }}
                </router-link>
            </li>
        </ol>`
}
</script>
