<template>
    <div class="card v-card">
        <div class="card-image v-card-image">
            <figure class="image v-image is-1by1">
                <nuxt-link to="/">
                    <img src="https://source.unsplash.com/random/1280x960?nature" alt="a random image">
                </nuxt-link>
            </figure>
        </div>
        <div class="v-body">
            <div class="card-content v-card-content">
                <p class="title is-5">Card Title</p>
                <p class="subtitle is-6"><a>@pdthang</a></p>
                <div class="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                </div>
            </div>
            <div class="card-footer v-card-footer">
                <div class="has-text-grey-light">
                    <b-icon icon="clock-outline" size="is-small"></b-icon>
                    {{itemData.updatedDate | fmDate}}
                </div>
                <a class="button is-info is-rounded is-outlined" @click="isModalSaleActive = true">Mua</a>
            </div>
        </div>
        <b-modal :active.sync="isModalSaleActive" has-modal-card>
            <v-modal-sale></v-modal-sale>
        </b-modal>
    </div>
</template>

<script>
    export default {
        props: {
            itemData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isModalSaleActive: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        &.v-card {
            display: flex;
            flex-direction: row;
            //flex-basis: 50ex;
            //flex-grow: 0;
            //flex-shrink: 1;
            box-shadow: 0 2px 5px 0 rgba(88,88,102,.07);
            border-radius: 0.5rem;
            margin-right: 0.5rem;
            margin-left: 0.5rem;
            .v-card-image {
                flex: 4;
                flex-shrink: 4;
                .v-image {
                    display: block;
                    //position: relative;
                    height: 100%;
                    width: 100%;
                    img {
                        object-fit: cover;
                        object-position: center;
                        border-radius: 0.5rem;
                        max-width: 94%;
                        max-height: 94%;
                        margin: auto 0;
                        margin-left: -6%;
                        box-shadow: 0 10px 40px 0 rgba(62,57,107,.2), 0 2px 9px 0 rgba(62,57,107,.2);
                        -webkit-transition: margin-left 220ms;
                        transition: margin-left 220ms;
                    }   
                }
            }
        }
        
        .v-body {
            flex: 5;
            flex-shrink: 5;
            display: flex;
            flex-direction: column;
            padding-right: 1rem;
            .v-card-content {
                padding-left: 0;
            }
            .v-card-footer {
                display: flex;
                border: none;
                justify-content: space-between;
                align-items: center;
                margin-top: auto;
                padding: 1.5rem 0;
            }
        }     
        &:hover .v-card-image .v-image {
            img {
                margin-left: -8%;
            }
        }
    }
    
</style>

