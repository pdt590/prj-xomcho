<template>
    <div class="card">
        <div class="card-image v-card-image">
			<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-4by3">
					<img class="v-image-card" v-lazy="itemData.images ? itemData.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
				</figure>
			</nuxt-link>
            <div class="v-item-pin" v-if="isNew">
                Mới
            </div>
            <div class="v-item-pin" v-else-if="isSale">
                Giảm giá
            </div>
        </div>
        <div class="card-content v-card-content">
            <b-tooltip :label="itemData.title" type="is-light" square>
                <nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
                    <span class="is-size-6 has-text-weight-bold has-text-black">{{itemData.title | fmString(20)}}</span> 
                </nuxt-link>
            </b-tooltip>
            <nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
                <span class="is-size-6 has-text-weight-normal has-text-grey">🛒{{itemData._shop.title}}</span>
            </nuxt-link>
        </div>
        <div class="card-footer v-card-footer">
            <a @click="isModalSaleActive=true">
                <b-icon icon="shopping" class="has-text-grey-light"></b-icon>
            </a>
            <div v-if="itemData.salePrice">
            	<strike class="is-size-6 has-text-grey-light">{{itemData.price | fmPrice}}{{itemData.currency}}</strike>
				<span class="is-size-5 has-text-danger">{{itemData.salePrice | fmPrice}}{{itemData.currency}}</span>
            </div>
            <div v-else>
				<span class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
            </div>
        </div>
        <b-modal :active.sync="isModalSaleActive" has-modal-card>
            <v-modal-sale />
        </b-modal>
    </div>
</template>

<script>
    import { genUrl } from '~/plugins/util-helpers'

    export default {
        props: {
            itemData: {
                type: Object,
                required: true
            }
        },
        computed: {
            isSale() {
                return (this.itemData.salePrice ? true : false)
            },
            isNew() {
                const now = new Date().getTime();
                const estimatedTime = Date.parse(this.itemData.updatedDate) +  (72 * 3600 * 1000)
                return (estimatedTime > now ? true : false)
            }
        },
        data() {
            return {
                isModalSaleActive: false
            }
        },
        methods: {
            genShopUrl(title, id) {
                return genUrl(title, id)
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
			.v-item-pin {
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
        }
        .v-card-content {
            height: 6rem;
        }
        .v-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
			padding: 0 1.5rem 0.6rem;
			border-top: none
        }
    }
</style>