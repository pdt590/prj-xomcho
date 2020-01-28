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
				</strong>
				<b-tag rounded type="is-black" v-if="!itemData.isAvailable">Hết hàng</b-tag>
				<b-tag rounded type="is-success" v-else-if="isNew">Mới</b-tag>
				<b-tag rounded type="is-danger" v-else-if="isSale">Giảm {{Math.floor((itemData.oldPrice - itemData.price)*100/itemData.oldPrice)}}%</b-tag>
				<br>
				<small>
					<nuxt-link class="has-text-grey" :to="`/shops/${genShopUrl(itemData._shop.title, itemData._shop.id)}`">
						🛒{{itemData._shop.title}}
					</nuxt-link>
				</small>
			</div>
			<div class="level is-mobile" style="align-self: flex-end">
				<div class="level-left">
					<a class="button has-text-grey-light" style="border: none" v-if="!user || user && user.id !== itemData._creator.id" @click="onSave" >
						<b-icon icon="heart" :type="isSaved ? `is-danger` : ``"></b-icon>
					</a>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div v-if="isSale">
							<p class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</p>
							<strike class="is-size-6 has-text-grey-light">{{itemData.oldPrice | fmPrice}}{{itemData.currency}}</strike>
						</div>
						<div v-else>
							<span class="is-size-5 has-text-danger">{{itemData.price | fmPrice}}{{itemData.currency}}</span>
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
	import { genUrl } from '~/plugins/util-helpers'

	export default {
		props: {
            itemData: {
                type: Object,
                required: true
            }
        },
        computed: {
			...mapGetters(['user', 'bmItems']),
            isSale() {
                return (this.itemData.oldPrice && Number(this.itemData.oldPrice) > Number(this.itemData.price) ? true : false)
            },
            isNew() {
                const now = new Date().getTime();
                const estimatedTime = Date.parse(this.itemData.updatedDate) +  (24 * 3600 * 1000)
                return (estimatedTime > now ? true : false)
			},
			isSaved() {
                return this.bmItems.find(bmItem => bmItem.url === this.itemData.url)
			}
        },
		data() {
			return {
                isModalJoinActive: false
			}
		},
        methods: {
            genShopUrl(title, id) {
                return genUrl(title, id)
            },
            async onSave() {
                if(this.user && !this.isSaved) {
                    await this.$store.dispatch('addBmItem', this.itemData.url)
                }else if(this.user && this.isSaved) {
                    await this.$store.dispatch('removeBmItem', this.isSaved.id)
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