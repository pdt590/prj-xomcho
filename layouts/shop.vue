<template>
    <section>
        <app-loading v-if="itemLoading || shopLoading"/>
        <app-navbar />
        <app-navbar-mobile />
        <nuxt/>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'check-auth',
        computed: {
            ...mapGetters(['itemLoading', 'shopLoading'])
        }
    }
</script>