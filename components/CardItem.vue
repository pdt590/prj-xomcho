<template>
    <div class="card">
        <div class="card-image v-card-image">
			<a :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-4by3">
					<img :src="itemData.images ? itemData.images[0].url : `/icon-photo.png`" alt="item_image">
				</figure>
			</a>
            <div class="v-item-pin" v-if="isSale">
                Giảm giá
            </div>
            <div class="v-item-pin" v-else-if="isNew">
                Mới
            </div>
        </div>
        <div class="card-content">
            <p class="title is-5">
                <a :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
                    {{itemData.title}}
                </a>
            </p>
			<p class="subtitle is-6 has-text-weight-normal has-text-black">
				<a class="has-text-grey" :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
					@{{itemData._shop.title}}
				</a>
			</p>
        </div>
        <div class="card-footer v-card-footer">
            <div>
                <b-tooltip label="Mua hàng" type="is-info" position="is-right">
                    <a @click="isModalSaleActive=true">
                        <b-icon icon="shopping" style="color: #AAA"></b-icon>
                    </a>
                </b-tooltip> 
            </div>
            <div v-if="itemData.salePrice">
            	<strike class="is-size-6 has-text-grey-light">{{itemData.price | fmPrice}}{{itemData.currency}}</strike>
				<span class="is-size-5">{{itemData.salePrice | fmPrice}}{{itemData.currency}}</span>
            </div>
            <div v-else>
				<span class="is-size-5">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
            </div>
        </div>
        <b-modal :active.sync="isModalSaleActive" has-modal-card>
            <v-modal-sale />
        </b-modal>
    </div>
</template>

<script>
    import { genUrl } from '~/plugins/utility-helpers'

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
                return ( 
                    (Date.parse(this.itemData.updatedDate) +  (72 * 3600 * 1000) < new Date().getTime()) ?
                    true : false
                )
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
        box-shadow: 0 2px 5px 0 rgba(88,88,102,.07);
        border-radius: 0.3rem;
        border: 1px solid #D8D8D8;
        .v-card-image {
			position: relative;
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
        .v-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
			padding: 0 1.5rem 0.8rem;
			border-top: none
        }
    }
</style>