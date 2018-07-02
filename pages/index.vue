<template>
    <section>
        <b-container fluid class="text-center my-bg-1">
            <h3>Who Am I?</h3>
            <img src="https://dummyimage.com/500x600/cc9b3f/040e1a" class="img-fluid" width="350" height="350">
            <h3>I'm an adventurer</h3>
        </b-container>
        <b-container fluid class="text-center my-bg-2">
            <h3>Who Am I?</h3>
            <img src="https://dummyimage.com/500x600/cc9b3f/040e1a" class="img-fluid" width="350" height="350">
            <h3>I'm an adventurer</h3>
        </b-container>
        <footer class="py-5 bg-dark">
            <b-container>
                <p class="m-0 text-center text-white">Copyright &copy; Your Website 2018</p>
            </b-container>
        </footer>
    </section>
</template>

<script>
    export default {
        layout: 'main'
    }
</script>

<style scoped>
    .my-bg-1 {
        background-color: white; /* Green */
        color: dimgrey;
        padding-top: 50px;
        padding-bottom: 50px;
    }
    .my-bg-2 {
        background-color: bisque; /* Dark Blue */
        color: #ffffff;
        padding-top: 50px;
        padding-bottom: 50px;
    }
</style>
