<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">     
            <app-sidebar-shop :shopData="loadedShop" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <div class="w3-col l5">
                            <app-slider-item />
                        </div>
                        <div class="w3-col l7">
                            <div class="w3-border-bottom">
                                <h3>{{loadedItem.title}}</h3>
                                <p><i class="fa fa-codepen"></i> Thương hiệu: <span class="w3-text-blue"><b> {{loadedItem.brand}}</b></span></p>
                            </div>
                            <br>
                            <h6 class="w3-text-grey w3-margin-right">Giá:</h6><h4 class="w3-text-red"><strong> {{loadedItem.price}} {{loadedItem.currency}} / {{loadedItem.unit}}</strong></h4>
                            <p><i class="fa fa-fw fa-clock-o"></i> Ngày tạo: {{loadedItem.updatedDate | date}}</p>
                            <hr>
                            <p>
                                - Thiết kế trẻ trung, năng động <br>
                                - Kích thước nhỏ gọn, tiện lợi <br>
                                - Chất liệu vải oxford dày dặn, độ bền cao <br>
                                - Thích hợp mang đi học, chơi thể thao <br>
                            </p>
                            <hr>
                            <div class="w3-row">
                                <h6>Loại sản phẩm</h6><br>
                                <div class="w3-col l4 m4 s6" 
                                    v-for="(type, i) in loadedItem.types" 
                                    :key="i">
                                    <p>
                                        <i class="w3-text-blue w3-large w3-margin-right" :class="type.icon"></i>
                                        {{ type.title }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="w3-row">
                            <nuxt-link
                                v-if="false"
                                :to="'/items/' + $route.params.itemId + '/edit-item'" 
                                class="w3-button w3-blue w3-margin-bottom w3-right w3-half">
                                <i class="fa fa-edit w3-large w3-margin-right"></i> 
                                Chỉnh sửa
                            </nuxt-link>
                            <div v-else class="w3-margin-bottom w3-right w3-quarter">
                                <app-btn-sale />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w3-padding w3-white w3-margin-bottom">
                    <form>
                        <h5><strong>Các nhận xét gần đây</strong></h5><br>
                        <p><input class="w3-input w3-border" type="text" placeholder="Name" required name="Name"></p>
                        <p><input class="w3-input w3-border" type="email" placeholder="Email" required name="Email"></p>
                        <p><input class="w3-input w3-border" type="text" placeholder="Message" required name="Message"></p>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit"><i class="fa fa-send-o w3-large w3-margin-right"></i>Gửi nhận xét</button>
                        </div>
                    </form>
                    <hr>
                    <div class="w3-row">
                        <div class="w3-col l1 m2 text-center">
                            <img src="https://picsum.photos/600/600/?image=49" class="w3-circle" style="width:50px;height:50px">
                        </div>
                        <div class="w3-col l11 m10">
                            <h4>Hoa <span class="w3-opacity w3-medium">Sep 29, 2018, 9:12 PM</span></h4>
                            <p>Chất lượng sản phẩm rất tốt</p>
                        </div>
                    </div>
                    <hr>
                </div>
                <hr>
                <div class="w3-center w3-padding-24">
                    Powered by 
                    <a href="https://www.tadicho.net" title="tadicho.net" target="_blank" class="w3-hover-opacity">tadicho.net</a>
                </div>                         
            </div>  
        </div>
    </section>
</template>

<script>
    async function loadItem(items, itemId, shopId) {
        let loadedItem = {}
        if(items) {
            loadedItem = items.find( item => {
                return item.itemId === itemId
            })
            return loadedItem
        }else {
            let loadedItems = await store.dispatch('loadItems', shopId)
            loadedItem = loadedItems.find( item => {
                return item.itemId === itemId
            })
            return loadedItem
        }
    }
    export default {
        layout: 'shop',
        async asyncData({ store, params }) {
            if(store.getters.loadedShop) {
                let item = await loadItem(store.getters.loadedItems, params.itemId)
                return {
                    loadedShop: store.getters.loadedShop,
                    loadedItem: item
                }
            }
            let [shop, items] = await Promise.all([
                store.dispatch('loadShop', params.shopId),
                store.dispatch('loadItems', params.shopId)
            ])
            let item  = await loadItem(items, params.itemId, params.shopId)
            return { 
                loadedShop: shop,
                loadedItem: item
            }
        },
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
    h3, h4, h5, h6 {
        display: inline-block;
    }
</style>
