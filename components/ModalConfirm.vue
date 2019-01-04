<template>
    <div>
        <form class="">
            <div class="modal-card v-modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Bạn có đồng ý xóa?</p>
                </header>
                <section class="modal-card-body">
                    <div class="buttons" style="display: flex; justify-content: center">
                        <a class="button is-grey is-outlined is-rounded is-medium" :class="{'is-loading': shopLoading}" @click.prevent="onDelete" v-if="shopData">
                            Đồng ý
                        </a>
                        <a class="button is-grey is-outlined is-rounded is-medium" :class="{'is-loading': itemLoading}" @click.prevent="onDelete" v-else-if="itemData">
                            Đồng ý
                        </a>
                        <a class="button is-grey is-outlined is-rounded is-medium" @click.prevent="$parent.close()">
                            Hủy
                        </a>
                    </div>
                </section>
                <footer class="modal-card-foot">
                </footer>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: {
            shopData: Object,
            itemData: Object
        },
        computed: {
            ...mapGetters(['shopLoading', 'itemLoading'])
        },
        methods: {
            async onDelete() {
                if(this.shopData) {
                    await this.$store.dispatch('deleteSpecificShopByUser', this.shopData.url)
                }else if(this.itemData) {
                    await this.$store.dispatch('deleteSpecificItemByUser', this.itemData.url)
                }
                this.$parent.close()
                location.reload();
            },
        }
    }
</script>