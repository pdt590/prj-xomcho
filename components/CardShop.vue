<template>
    <div class="card">
        <div class="card-image v-card-image">
            <nuxt-link :to="`/shops/${shopData.url}`">
                <figure class="image is-4by3">
                    <client-only>
                        <img class="v-image-card" v-lazy="shopData.logoImage ? shopData.logoImage.url : require(`../assets/images/categories/${shopData.category}.png`)" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                    </client-only>
                </figure>
                <div class="content v-shop-description">
                    <p class="is-size-6 has-text-black has-text-weight-normal" style="line-height: 1.5em;">{{shopData.description | fmString(60)}}</p>
                </div>
            </nuxt-link>
        </div>
        <div class="card-content">
            <p class="is-size-6 is-uppercase has-text-grey-light">{{shopCategory}}</p>
            <nuxt-link :to="`/shops/${shopData.url}`">
                <span class="is-size-6 has-text-black has-text-weight-bold">{{shopData.title}} 🔥</span> 
            </nuxt-link>
        </div>
        <div class="card-footer v-card-footer">
            <a class="button has-text-grey-light" style="border: none" v-if="!user || user && user.id !== shopData._creator.id" @click="onSave">
                <b-icon icon="bookmark" :type="isSaved ? `is-danger` : ``"></b-icon>
            </a>
            <div class="has-text-grey">
                <b-icon icon="map-marker-outline" size="is-small"></b-icon>
                {{shopData.province}}
            </div>
        </div>
        <b-modal :active.sync="isModalJoinActive" has-modal-card>
            <v-modal-join />
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { categories } from '~/plugins/util-lists'

    export default {
        props: {
            shopData: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters(['user', 'bmShops']),
            shopCategory() {
                return categories.find(category => category.id === this.shopData.category).name
            },
			isSaved() {
                return this.bmShops.find(bmShop => bmShop.url === this.shopData.url)
            }
        },
        data() {
            return {
                isModalJoinActive: false
            }
        },
        methods: {
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmShop', this.shopData.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmShop', this.isSaved.id)
                }else {
                    if(this.$route.path === '/') {
                        this.$router.push('/user/join')
                    }else {
                        this.isModalJoinActive = true
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        border-radius: 4px;
        border: 1px solid #D8D8D8;
        box-shadow: none;
        .v-card-image {
            position: relative;
            transition: all 2s cubic-bezier(0.215, 0.610, 0.355, 1);
            border-bottom:  1px solid #D8D8D8;
            img {
                border-top-left-radius: 0.3rem;
                border-top-right-radius: 0.3rem;
            }
            .v-shop-description {
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
                padding: 1.5rem;
                background-color: #EEE;
                opacity: 0; 
            }
        }
        .v-card-image:hover .v-shop-description {
            opacity: 0.9;
        }
        .v-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.6rem 1.5rem;
        }
    }
</style>