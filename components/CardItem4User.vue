<template>
	<div class="media v-media">
		<div class="media-left">
			<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
				<figure class="image is-96x96">
					<client-only>
						<img class="v-image-mobile-card" v-lazy="itemData.images ? itemData.images[0].url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="item_image">
					</client-only>
				</figure>
			</nuxt-link>
		</div>
		<div class="media-content" style="overflow: hidden;">
			<div class="content">
				<strong>
					<nuxt-link :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}`">
						{{itemData.title}}
					</nuxt-link>
				</strong> &bull;
				<small class="is-uppercase">{{itemCategory}}</small>
				<b-tag rounded type="is-black" v-if="!itemData.isAvailable">Hết hàng</b-tag>
				<b-tag rounded type="is-success" v-else-if="isNew">Mới</b-tag>
				<b-tag rounded type="is-danger" v-else-if="isSale">Giảm {{Math.floor((itemData.oldPrice - itemData.price)*100/itemData.oldPrice)}}%</b-tag>
				<br class="is-hidden-mobile">
				<nuxt-link class="has-text-grey" :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
					<span class="is-hidden-tablet"> &bull;</span> 🛒{{itemData._shop.title}}
				</nuxt-link>
				<!-- For mobile -->
				<div class="has-text-grey-light is-hidden-tablet">
					<b-icon icon="clock-outline" size="is-small"></b-icon>
					{{itemData.updatedDate | fmDate}}
				</div>
				<!--  -->
			</div>
			<!-- For mobile -->
			<div class="buttons is-hidden-tablet">
				<a class="button is-danger is-rounded is-outlined" @click="isModalConfirmActive=true">Xóa</a>
            	<nuxt-link class="button is-info is-rounded is-outlined" :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}/edit-item`" target="_blank">Sửa</nuxt-link>
			</div>
			<!--  -->
			<div class="level is-mobile is-hidden-mobile">
				<div class="level-left">
					<div class="level-item">
						<div class="has-text-grey-light">
							<b-icon icon="clock-outline" size="is-small"></b-icon>
							{{itemData.updatedDate | fmDate}}
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="media-right is-hidden-mobile">
			<div class="buttons">
				<a class="button is-danger is-rounded is-outlined" @click="isModalConfirmActive=true">Xóa</a>
            	<nuxt-link class="button is-info is-rounded is-outlined" :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}/${itemData.url}/edit-item`" target="_blank">Sửa</nuxt-link>
			</div>
        </div>
		<b-modal :active.sync="isModalConfirmActive" has-modal-card>
            <v-modal-confirm :itemData="itemData" />
        </b-modal>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { categories } from '~/libs/lists'
	import { genUrl } from '~/libs/helpers'

	export default {
		props: {
            itemData: {
                type: Object,
                required: true
            }
        },
        computed: {
			itemCategory() {
                return categories.find(category => category.id === this.itemData.category).name
            },
            isSale() {
                return (this.itemData.oldPrice && Number(this.itemData.oldPrice) > Number(this.itemData.price) ? true : false)
            },
            isNew() {
                const now = new Date().getTime();
                const estimatedTime = Date.parse(this.itemData.updatedDate) +  (24 * 3600 * 1000)
                return (estimatedTime > now ? true : false)
            }
        },
		data() {
			return {
				isModalConfirmActive: false
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