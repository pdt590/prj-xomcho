<template>
    <div class="card v-card">
        <div class="card-image v-card-image">
            <figure class="image is-3by2">
                <img src="https://source.unsplash.com/random/1280x960?nature" alt="a random image">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5">Card Title</p>
            <p class="subtitle is-6"><a>@pdthang</a></p>
            <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                <b-field grouped group-multiline>
                    <div class="control">
                        <b-taglist attached>
                            <b-tag type="is-dark is-small">npm</b-tag>
                            <b-tag type="is-info is-small">0.5.1</b-tag>
                        </b-taglist>
                    </div>

                    <div class="control">
                        <b-taglist attached>
                            <b-tag type="is-dark is-small">downloads</b-tag>
                            <b-tag type="is-success is-small">15k</b-tag>
                        </b-taglist>
                    </div>
                </b-field>
            </div>
        </div>
        <div class="card-footer v-card-footer">
            <div class="has-text-grey-light">
                <b-icon icon="clock-outline" size="is-small"></b-icon>
                {{shopData.updatedDate | fmDate}}
            </div>
            <nuxt-link class="button is-info is-rounded is-outlined" to="">View shop</nuxt-link>
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
        border-radius: 0.5rem;
        border: 1px solid #D8D8D8;
        &.v-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            .v-card-image {
                margin-top: -1.5%;    
                img {
                    box-shadow: 0 10px 40px 0 rgba(62,57,107,.2), 0 2px 9px 0 rgba(62,57,107,.2);
                    background-color: #E8E8E8;
                    border-radius: 0.5rem;
                    max-width: 96.5%;
                    max-height: 96.5%;
                    margin: 0 auto;
                    -webkit-transition: margin-top 220ms;
                    transition: margin-top 220ms;
                }
            }
            .v-card-footer {
                display: flex;
                border: none;
                justify-content: space-between;
                align-items: center;
                margin-top: auto;
                padding: 1.5rem;
                background-color: rgb(250, 250, 250);
            }
            &:hover .v-card-image img {
                margin-top: -2%;
            }
        }
    }
</style>
