<template>
    <div class="card is-shop">
        <div class="card-image">
            <figure class="image is-2by1">
                <img src="https://source.unsplash.com/random/1280x960?nature" alt="a random image">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-5">Card Title</p>
            <div class="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </div>
        </div>
        <div class="card-footer">
            <div>
                <b-icon icon="clock-outline" size="is-small"></b-icon>
                <a>{{shopData.updatedDate | fmDate}}</a>
            </div>
            <div>
                <span>View on <a> Twitter</a></span>
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
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 0.5rem;
        &.is-shop {
            display: flex;
            flex-direction: column;
            height: 100%;
            .card-footer {
                display: flex;
                margin-top: auto;
                border: none;
                justify-content: space-between;
                padding: 1.5rem;
                padding-top: 0rem;
            }
        }
        img {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.19);
            border-radius: 0.5rem;
            max-width: 96.5%;
            max-height: 96.5%;
            margin: 0 auto;
            margin-top: -2.5%;
            -webkit-transition: margin-top 220ms;
            transition: margin-top 220ms;
        }
        &:hover {
            img {
                margin-top: -4%;
            }
        }
    }
</style>
