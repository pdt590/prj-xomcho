<template>
    <section>
        <div class="w3-row">
            <div class="w3-col l4 m4 s6" 
                v-for="(type, i) in itemTypes" 
                :key="i">
                <p>
                    <label class="myContainer">
                        <input type="checkbox" checked="checked">
                        <span class="myCheckmark"></span>
                        <i class="w3-xlarge w3-margin-right" :class="type.icon"></i>
                        {{ type.title }}
                    </label>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                itemTypes: [
                    {icon: "fa fa-shopping-basket", title: "Thực phẩm"},
                    {icon: "fa fa-leaf", title: "Nông sản"},
                    {icon: "fa fa-cutlery", title: "Gia dụng"},
                    {icon: "fa fa-camera-retro", title: "Điện tử"},
                    {icon: "fa fa-medkit", title: "Y tế"},
                    {icon: "fa fa-shopping-bag", title: "Thời trang"},
                    {icon: "fa fa-question-circle", title: "Khác"}
                ]
            }
        }
    } 
</script>

<style scoped>
    /* The myContainer */
    .myContainer {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .myContainer input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom checkbox */
    .myCheckmark {
        position: absolute;
        top: 4px;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .myContainer:hover input ~ .myCheckmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .myContainer input:checked ~ .myCheckmark {
        background-color: #2196F3;
    }

    /* Create the myCheckmark/indicator (hidden when not checked) */
    .myCheckmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the myCheckmark when checked */
    .myContainer input:checked ~ .myCheckmark:after {
        display: block;
    }

    /* Style the myCheckmark/indicator */
    .myContainer .myCheckmark:after {
        left: 6px;
        top: 2px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
