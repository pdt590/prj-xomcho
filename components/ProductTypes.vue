<template>
    <section>
        <div class="w3-row">
            <div class="w3-col l4 m4 s6" 
                v-for="(type, i) in itemTypes" 
                :key="i">
                <p>
                    <label class="my-container">
                        <input type="checkbox" checked="checked">
                        <span class="my-checkmark"></span>
                        <img :src="type.icon" class="w3-round w3-margin-right" style="width:10%;">
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
                    {icon: "/meat.svg", title: "Thực phẩm"},
                    {icon: "/agri.svg", title: "Nông sản"},
                    {icon: "/pot.svg", title: "Gia dụng"},
                    {icon: "/electronic.svg", title: "Điện tử"},
                    {icon: "/medicine.svg", title: "Y tế"},
                    {icon: "/fashion.svg", title: "Thời trang"},
                    {icon: "/others.svg", title: "Khác"}
                ]
            }
        }
    } 
</script>

<style scoped>
    /* The my-container */
    .my-container {
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
    .my-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom checkbox */
    .my-checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .my-container:hover input ~ .my-checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .my-container input:checked ~ .my-checkmark {
        background-color: #2196F3;
    }

    /* Create the my-checkmark/indicator (hidden when not checked) */
    .my-checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the my-checkmark when checked */
    .my-container input:checked ~ .my-checkmark:after {
        display: block;
    }

    /* Style the my-checkmark/indicator */
    .my-container .my-checkmark:after {
        left: 9px;
        top: 5px;
        width: 8px;
        height: 13px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
