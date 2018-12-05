<template>
    <div class="card">
        <div class="card-image v-card-image">
            <a :href="`/shops/${shopData.url}`">
                <figure class="image is-4by3">
                    <img :src="shopData.logo ? shopData.logo : `/icon-photo.png`" alt="shop_logo">
                </figure>
                <div class="content v-shop-description">
                    <p class="subtitle is-6 has-text-black has-text-weight-normal" style="line-height: 1.5em;">
                        {{shopData.description.slice(0, 30)}}
                    </p>
                </div>
            </a>
        </div>
        <div class="card-content">
			<p class="is-size-6 is-uppercase has-text-weight-bold has-text-grey-light">Cửa hàng {{shopData.category}}</p>
            <p class="title is-5" style="margin-bottom: 0.4rem">
                <a :href="`/shops/${shopData.url}`">
                    {{shopData.title}}
                </a>
            </p>
            <b-taglist>
                <b-tag rounded type="is-warning" 
                    v-for="(itemType, i) in shopData.itemTypes.slice(0, 3)" :key="i">
                    itemType
                </b-tag>
                <b-tag rounded type="is-warning">...</b-tag>
            </b-taglist>
        </div>
        <div class="card-footer v-card-footer">
            <b-tooltip label="Lưu cửa hàng" type="is-info" position="is-right">
                <a>
                    <b-icon icon="bookmark" style="color: #AAA"></b-icon>
                </a>
            </b-tooltip>
            <div class="has-text-grey-light">
                <b-icon icon="map-marker-outline" size="is-small"></b-icon>
                {{shopData.province}}
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
    .card {
        box-shadow: 0 2px 5px 0 rgba(88,88,102,.07);
        border-radius: 0.3rem;
        border: 1px solid #D8D8D8;
        .v-card-image {
            position: relative;
            transition: all 2s cubic-bezier(0.215, 0.610, 0.355, 1);
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
            padding: 0 1.5rem 0.8rem;
            border-top: none
        }
    }
</style>