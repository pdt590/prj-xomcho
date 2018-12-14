<template>
    <div class="card">
        <div class="card-image v-card-image">
            <nuxt-link :to="`/shops/${shopData.url}`">
                <figure class="image is-4by3">
                    <img class="v-image-card" v-lazy="shopData.logoImage ? shopData.logoImage.url : `/icon-photo.png`" style='display: none' onload="this.style.display = 'block'" alt="shop_logo">
                </figure>
                <div class="content v-shop-description">
                    <p class="is-size-6 has-text-black has-text-weight-normal" style="line-height: 1.5em;">
                        {{shopData.description | fmString(60)}}
                    </p>
                </div>
            </nuxt-link>
        </div>
        <div class="card-content">
            <p class="is-size-6 is-uppercase has-text-grey-light">{{shopCategory}}</p>
                <nuxt-link :to="`/shops/${shopData.url}`">
                    <span class="is-size-6 has-text-black has-text-weight-bold">{{shopData.title}} 🔥</span> 
                </nuxt-link>
            <!-- <b-taglist>
                <b-tag rounded type="is-warning" 
                    v-for="(type, i) in shopData.itemTypes.slice(0, 2)" :key="i">
                    {{type}}
                </b-tag>
                <b-tag rounded type="is-warning">...</b-tag>
            </b-taglist> -->
        </div>
        <div class="card-footer v-card-footer">
            <b-icon icon="bookmark" class="has-text-grey-light"></b-icon>
            <div class="has-text-grey">
                <b-icon icon="map-marker-outline" size="is-small"></b-icon>
                {{shopData.province}}
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
    .card {
        border-radius: 4px;
        border: 1px solid #D8D8D8;
        box-shadow: none;
        .v-card-image {
            position: relative;
            transition: all 2s cubic-bezier(0.215, 0.610, 0.355, 1);
            border-bottom:  1px solid #D8D8D8;
            img {
                border-top-left-radius: 0.3rem;
                border-top-right-radius: 0.3rem;
            }
            .v-shop-description {
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
                padding: 1.5rem;
                background-color: #EEE;
                opacity: 0; 
            }
        }
        .v-card-image:hover .v-shop-description {
            opacity: 0.9;
        }
        .v-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.6rem 1.5rem;
        }
    }
</style>