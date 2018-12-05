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
    export default {
        data() {
            return {
                enableSearch: false
            }
        },
        methods: {
            onSearch() {
                this.enableSearch = !this.enableSearch;
                this.enableSearch ? this.$refs.search.style.display = 'block' : this.$refs.search.style.display = 'none'
            }
        }
    }
</script>

