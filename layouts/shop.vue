<template>
    <section>
        <app-navbar />
        <app-navbar-mobile />
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop></app-sidebar-shop>
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <nuxt/>
                <hr>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<style>
    html,body,h1,h2,h3,h4,h5,h6 {
        font-family: "Nunito", sans-serif;
    }
    html, body {
        font-size: 13px
    }
    h1{font-size:36px} h2{font-size:30px} h3{font-size:24px} 
    h4{font-size:20px} h5{font-size:18px} h6{font-size:16px}
</style>