<template>
    <section>
        <app-navbar :navItems="navItems" />
        <div class="w3-content w3-padding-64" style="max-width:1030px">     
            <app-navbar-mobile-main :navItems="navItems" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main">
                <nuxt/>
                <hr>
                <app-footer/>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                navItems: [
                    {link: '/shops/new-shop', icon: 'fa fa-plus-square', title: ''}
                ]
            }
        }
    }
</script>

<style>
    body,h1,h2,h3,h4,h5,p {
        font-family: "Nunito", sans-serif;
    }
    body {
        background-color: #f1f1f1;
    }
</style>