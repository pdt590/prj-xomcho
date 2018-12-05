<template>
    <div>
        <v-navbar/>
        <main class="v-main">
            <nuxt/>
        </main>
        <v-footer/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        middleware: 'check-auth'
    }
</script>
