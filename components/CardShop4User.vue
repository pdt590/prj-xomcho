<template>
	<div class="media v-media">
		<div class="media-left">
			<nuxt-link :to="`/shops/${shopData.url}`">
				<figure class="image is-96x96">
					<img class="v-image-mobile-card" v-lazy="shopData.logoImage ? shopData.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
				</figure>
			</nuxt-link>
		</div>
		<div class="media-content" style="overflow: hidden;">
			<div class="content">
				<strong>
					<nuxt-link :to="`/shops/${shopData.url}`">
                        {{shopData.title}}
                    </nuxt-link>
				</strong>
				<small class="is-uppercase">- {{shopCategory}}</small>
				<!-- For mobile -->
				<div class="has-text-grey-light is-hidden-tablet">
					<b-icon icon="clock-outline" size="is-small"></b-icon>
					{{shopData.updatedDate | fmDate}}
				</div>
				<!--  -->
			</div>
			<!-- For mobile -->
			<div class="buttons is-hidden-tablet">
				<!-- <a class="button is-danger is-rounded is-outlined" :class="{'is-loading': authLoading}" @click="onDelete(shopData.url)">Xóa</a> -->
            	<nuxt-link class="button is-info is-rounded is-outlined" :to="`/shops/${shopData.url}/edit-shop`" target="_blank">Sửa</nuxt-link>
			</div>
			<!--  -->
			<div class="level is-mobile is-hidden-mobile">
				<div class="level-left">
					<div class="level-item">
						<div class="has-text-grey-light">
							<b-icon icon="clock-outline" size="is-small"></b-icon>
							{{shopData.updatedDate | fmDate}}
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="media-right is-hidden-mobile">
			<div class="buttons">
				<!-- <a class="button is-danger is-rounded is-outlined" :class="{'is-loading': authLoading}" @click="onDelete(shopData.url)">Xóa</a> -->
            	<nuxt-link class="button is-info is-rounded is-outlined" :to="`/shops/${shopData.url}/edit-shop`" target="_blank">Sửa</nuxt-link>
			</div>
        </div>
	</div>
</template>

<script>
    import { categories } from '~/plugins/util-lists'
	import { mapGetters } from 'vuex'

	export default {
		props: {
            shopData: {
                type: Object,
                required: true
            }
		},
		computed: {
            ...mapGetters(['authLoading']),
            shopCategory() {
                return categories.find(category => category.id === this.shopData.category).name
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
