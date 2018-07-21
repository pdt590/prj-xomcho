<template>
    <section>
        <i class="w3-margin-right" :class="isSave ? 'my-heart fa fa-star' :'my-heart fa fa-star-o'" @click="onSave()"></i> Lưu cửa hàng
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isSave: false
            }
        },
        methods: {
            onSave() {
                this.isSave = !this.isSave
            }
        }
    }
</script>

<style scoped>
    .my-heart {
        font-size: 27px;
        color:red;
        cursor: pointer;
    }
</style>

