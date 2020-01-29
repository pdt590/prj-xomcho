<template>
	<div class="media v-media">
		<div class="media-left">
			<nuxt-link :to="`/shops/${shopData.url}`">
				<figure class="image is-96x96">
					<client-only>
						<img class="v-image-mobile-card" v-lazy="shopData.logoImage ? shopData.logoImage.url : require(`../assets/images/categories/${shopData.category}.png`)" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
					</client-only>
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
			</div>
			<div class="level is-mobile">
				<div class="level-left">
					<a class="level-item">
						<a class="button has-text-grey-light" style="border: none" v-if="!user || user && user.id !== shopData._creator.id" @click="onSave">
							<b-icon icon="bookmark" :type="isSaved ? `is-danger` : ``"></b-icon>
						</a>
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
		<b-modal :active.sync="isModalJoinActive" has-modal-card>
            <v-modal-join />
        </b-modal>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
    import { categories } from '~/libs/lists'

	export default {
		props: {
            shopData: {
                type: Object,
                required: true
            }
        },
        computed: {
			...mapGetters(['user', 'bmShops']),
            shopCategory() {
                return categories.find(category => category.id === this.shopData.category).name
			},
			isSaved() {
                return this.bmShops.find(bmShop => bmShop.url === this.shopData.url)
            }
		},
		data() {
            return {
                isModalJoinActive: false
            }
        },
        methods: {
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmShop', this.shopData.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmShop', this.isSaved.id)
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
	.v-media {
		border-bottom: 1px solid #D8D8D8;
		padding-bottom: 0.5rem;
	}
</style>
