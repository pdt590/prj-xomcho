<template>
    <div class="card">
        <div class="card-image v-card-image">
			<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-4by3">
                    <no-ssr>
                        <img class="v-image-card" v-lazy="itemData.images ? itemData.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
                    </no-ssr>
				</figure>
			</nuxt-link>
            <div class="v-item-pin-soldout" v-if="!itemData.isAvailable">
                Hết hàng
            </div>
            <div class="v-item-pin-new" v-else-if="isNew">
                Mới
            </div>
            <div class="v-item-pin-sale" v-else-if="isSale">
                Giảm {{Math.floor((itemData.oldPrice - itemData.price)*100/itemData.oldPrice)}}%
            </div>
        </div>
        <div class="card-content v-card-content">
            <b-tooltip :label="itemData.title" type="is-light" square>
                <nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
                    <span class="is-size-6 has-text-weight-bold has-text-black">{{itemData.title | fmString(40)}}</span> 
                </nuxt-link>
            </b-tooltip>
            <br>
            <nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
                <span class="is-size-6 has-text-weight-normal has-text-grey">🛒{{itemData._shop.title}}</span>
            </nuxt-link>
        </div>
        <div class="card-footer v-card-footer">
            <a class="button has-text-grey-light" style="border: none" v-if="!user || user && user.id !== itemData._creator.id" @click="onSave" >
                <b-icon icon="heart" :type="isSaved ? `is-danger` : ``"></b-icon>
            </a>
            <div v-if="isSale">
                <p class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</p>
            	<strike class="is-size-6 has-text-grey-light">{{itemData.oldPrice | fmPrice}}{{itemData.currency}}</strike>
            </div>
            <div v-else>
				<span class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
            </div>
        </div>
        <b-modal :active.sync="isModalJoinActive" has-modal-card>
            <v-modal-join />
        </b-modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { genUrl } from '~/plugins/util-helpers'

    export default {
        props: {
            itemData: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters(['user', 'bmItems']),
            isSale() {
                return (this.itemData.oldPrice && Number(this.itemData.oldPrice) > Number(this.itemData.price) ? true : false)
            },
            isNew() {
                const now = new Date().getTime();
                const estimatedTime = Date.parse(this.itemData.updatedDate) +  (24 * 3600 * 1000)
                return (estimatedTime > now ? true : false)
            },
            isSaved() {
                return this.bmItems.find(bmItem => bmItem.url === this.itemData.url)
            }
        },
        data() {
            return {
                isModalJoinActive: false
            }
        },
        methods: {
            genShopUrl(title, id) {
                return genUrl(title, id)
            },
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmItem', this.itemData.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmItem', this.isSaved.id)
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
            border-bottom:  1px solid #D8D8D8;
			img {
				border-top-left-radius: 0.3rem;
				border-top-right-radius: 0.3rem;
			}
            .v-item-pin-soldout {
				position: absolute;
				top: 5%;
				right: -1rem;
                text-align: center;
				background-color: rgb(60, 60, 60);
                color: white;
                padding: 0.8rem 0;
                width: 40%;
                &:before {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-width: 0.5rem;
                    border-style: solid;
                    border-top-color: rgb(60, 60, 60);
                    border-left-color: rgb(60, 60, 60);
                    top: 100%;
                    right: 0;
                }
			}
			.v-item-pin-new {
				position: absolute;
				top: 5%;
				right: -1rem;
                text-align: center;
				background-color: #87B919;
                color: white;
                padding: 0.8rem 0;
                width: 30%;
                &:before {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-width: 0.5rem;
                    border-style: solid;
                    border-top-color: rgb(122, 168, 23);
                    border-left-color: rgb(122, 168, 23);
                    top: 100%;
                    right: 0;
                }
            }
            .v-item-pin-sale {
				position: absolute;
				top: 5%;
				right: -1rem;
                text-align: center;
				background-color: rgb(228, 97, 97);
                color: white;
                padding: 0.8rem 0;
                width: 40%;
                &:before {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-width: 0.5rem;
                    border-style: solid;
                    border-top-color: rgb(218, 94, 94);
                    border-left-color: rgb(218, 94, 94);
                    top: 100%;
                    right: 0;
                }
			}
        }
        .v-card-content {
            min-height: 5rem;
        }
        .v-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 0 1.5rem 0.6rem;
            margin-top: 0.5rem;
			border-top: none
        }
    }
</style>