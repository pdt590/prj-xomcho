<template>
    <div class="hero" style="padding-top: 5rem">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title is-3" v-if="error.statusCode === 404">Không tìm thấy trang 😰😰😰!</h1>
                <h1 class="title is-3" v-else>🚩{{error.message}}</h1>
                <nuxt-link class="subtitle is-4 has-text-link" to="/">Quay vể trang chủ</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['error']
    }
</script>