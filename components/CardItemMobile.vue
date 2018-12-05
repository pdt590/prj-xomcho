<template>
	<div class="media v-media">
		<div class="media-left">
			<a :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-96x96">
					<img :src="itemData.images ? itemData.images[0].url : `/icon-photo.png`" alt="item_image">
				</figure>
			</a>
		</div>
		<div class="media-content" style="overflow: hidden;">
			<div class="content">
				<strong>
					<a :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
						{{itemData.title}}
					</a>
				</strong>
				<b-tag rounded type="is-success" v-if="isSale">Giảm giá</b-tag>
				<b-tag rounded type="is-success" v-else-if="isNew">Mới</b-tag>
				<br>
				<small>
					<a class="has-text-grey" :href="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
						@{{itemData._shop.title}}
					</a>
				</small>
			</div>
			<div class="level is-mobile">
				<div class="level-left">
					<a class="level-item" @click="isModalSaleActive=true">
						<b-icon icon="shopping"></b-icon>
					</a>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div v-if="itemData.salePrice">
							<strike class="is-size-6 has-text-grey-light">{{itemData.price | fmPrice}}{{itemData.currency}}</strike>
							<span class="is-size-5">{{itemData.salePrice | fmPrice}}{{itemData.currency}}</span>
						</div>
						<div v-else>
							<span class="is-size-5">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
						</div>
					</div>
				</div>
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
	.v-media {
		border-bottom: 1px solid #D8D8D8;
		padding-bottom: 0.5rem;
	}
</style>