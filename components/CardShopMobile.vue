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
				</strong>&bull;
				<small class="is-uppercase">{{shopCategory}}</small>
				<br><br>
				<!-- <b-taglist>
					<b-tag rounded type="is-warning" 
						v-for="(type, i) in shopData.itemTypes.slice(0, 2)" :key="i">
						{{type}}
					</b-tag>
					<b-tag rounded type="is-warning">...</b-tag>
				</b-taglist> -->
			</div>
			<div class="level is-mobile">
				<div class="level-left">
					<a class="level-item">
						<b-icon icon="bookmark" class="has-text-grey-light"></b-icon>
					</a>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div class="has-text-grey">
							<b-icon icon="map-marker-outline" size="is-small"></b-icon>
							{{shopData.province}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { categories } from '~/plugins/util-lists'

	export default {
		props: {
            shopData: {
                type: Object,
                required: true
            }
        },
        computed: {
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
