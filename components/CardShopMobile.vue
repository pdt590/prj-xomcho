<template>
	<div class="media v-media">
		<div class="media-left">
			<a :href="`/shops/${shopData.url}`">
				<figure class="image is-96x96">
					<img :src="shopData.logo ? shopData.logo : `/icon-photo.png`" alt="shop_logo">
				</figure>
			</a>
		</div>
		<div class="media-content" style="overflow: hidden;">
			<div class="content">
				<strong>
					<a :href="`/shops/${shopData.url}`">
                        {{shopData.title}}
                    </a>
				</strong>
				<small class="is-uppercase">- {{shopData.category}}</small>
				<br><br>
				<b-taglist>
					<b-tag rounded type="is-warning" 
						v-for="(type, i) in shopData.itemTypes.slice(0, 3)" :key="i">
						{{type}}
					</b-tag>
					<b-tag rounded type="is-warning">...</b-tag>
				</b-taglist>
			</div>
			<div class="level is-mobile">
				<div class="level-left">
					<a class="level-item">
						<b-icon icon="bookmark"></b-icon>
					</a>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div class="has-text-grey-light">
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
	export default {
		props: {
            shopData: {
                type: Object,
                required: true
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
