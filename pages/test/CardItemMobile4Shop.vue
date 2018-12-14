<template>
	<div class="media v-media">
		<div class="media-left">
			<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-96x96">
					<img class="v-image-mobile-card" v-lazy="itemData.images ? itemData.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
				</figure>
			</nuxt-link>
		</div>
		<div class="media-content" style="overflow: hidden;">
			<div class="content">
				<strong>
					<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
						{{itemData.title}}
					</nuxt-link>
				</strong>
				<b-tag rounded type="is-success" v-if="isNew">Mới</b-tag>
				<b-tag rounded type="is-success" v-else-if="isSale">Giảm giá</b-tag>
				<br>
				<small>
					<nuxt-link class="has-text-grey" :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
						🛒{{itemData._shop.title}}
					</nuxt-link>
				</small>
			</div>
            <br>
			<div class="level is-mobile" style="align-self: flex-end">
				<div class="level-left">
					<a class="level-item" @click="isModalSaleActive=true">
						<b-icon icon="shopping" class="has-text-grey-light"></b-icon>
					</a>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div v-if="itemData.salePrice">
							<strike class="is-size-6 has-text-grey-light">{{itemData.price | fmPrice}}{{itemData.currency}}</strike>
							<span class="is-size-5 has-text-danger">{{itemData.salePrice | fmPrice}}{{itemData.currency}}</span>
						</div>
						<div v-else>
							<span class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
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
	.v-media {
		border-bottom: 1px solid #D8D8D8;
		padding-bottom: 0.5rem;
    }
</style>