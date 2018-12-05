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
			</div>
			<div class="level is-mobile">
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
        <div class="media-right">
			<!-- TODO -->
			<a class="button is-danger is-outlined" :class="{'is-loading': authLoading}" @click="onDelete(shopData.url)">Xóa</a>
            <a class="button is-info is-outlined" :href="`/shops/${shopData.url}/edit-shop`" target="_blank">Sửa</a>
        </div>
	</div>
</template>

<script>
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
		},
		methods: {
			onDelete(shopUrl) {
				this.$store.dispatch('deleteShop', shopUrl)
				this.$router.push(`${this.$route.path}`)
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
