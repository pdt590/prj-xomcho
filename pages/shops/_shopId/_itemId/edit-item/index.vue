<template>
    <section>
        <div class="w3-content w3-padding-64" style="max-width:1300px">
            <app-sidebar-shop :shopData="loadedShop" />
            <!-- !PAGE CONTENT! -->
            <div class="w3-main" style="margin-left:270px;">
                <div class="w3-padding w3-white w3-margin-bottom">
                    <div class="w3-row">
                        <a href="javascript:void(0)" @click="openTab($event, 'itemInfo')">
                            <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding w3-border-red">
                                <h5><strong>Thông tin</strong></h5>
                            </div>
                        </a>
                        <a href="javascript:void(0)" @click="openTab($event, 'itemImg')">
                            <div class="w3-col l6 m6 s6 tablink w3-bottombar w3-hover-light-grey w3-padding">
                                <h5><strong>Ảnh</strong></h5>
                            </div>
                        </a>
                    </div>
                    <hr>
                    
                    <form id="itemInfo" class="w3-margin-bottom section">
                        <h5><strong>Thông tin sản phẩm</strong></h5><br>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-file-archive-o w3-large"></i> Tên sản phẩm</label>
                                <input class="w3-input w3-border" type="text" required v-model="loadedItem.itemTitle">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-codepen w3-large"></i> Thương hiệu</label>
                                <input class="w3-input w3-border" type="text" required v-model="loadedItem.itemBrand">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i> Giá</label>
                                <input class="w3-input w3-border" type="text" required v-model="loadedItem.itemPrice">
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-dollar w3-large"></i> Giá sale</label>
                                <input class="w3-input w3-border" type="text" required v-model="loadedItem.itemSalePrice">
                            </div>
                        </div>
                        <div class="w3-row-padding" style="margin:0 -16px;">
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-money w3-large"></i> Loại tiền</label>
                                <select class="w3-select w3-border" name="option" v-model="loadedItem.itemCurrency">
                                    <option value="1" selected>VND</option>
                                    <option value="2">USD</option>
                                </select>
                            </div>
                            <div class="w3-half w3-margin-bottom">
                                <label><i class="fa fa-balance-scale w3-large"></i> Đơn vị</label>
                                <input class="w3-input w3-border" type="text" placeholder= "Số lượng sản phẩm có thể mua với giá ở trên" required v-model="loadedItem.itemUnit">
                            </div>
                        </div>
                        <hr>
                        <h5><strong>Miêu tả</strong></h5><br>
                        <textarea class="w3-input w3-border" rows="5" style="resize:none" v-model="loadedItem.itemDesc"></textarea>
                        <hr>
                        <h5><strong>Loại sản phẩm</strong></h5><br>
                        <app-product-types/>
                        <br>
                        <div class="w3-row">
                            <button class="w3-button w3-border w3-border-blue  w3-right w3-quarter" type="submit" @click.prevent="onEditItem">
                                <i class="fa fa-save w3-xlarge w3-margin-right" :class="itemLoading ? 'fa fa-spinner fa-spin' : 'fa fa-save'"></i>Lưu thay đổi</button>
                        </div>
                    </form>

                    <div id="itemImg" class="w3-margin-bottom section" style="min-height: 800px; display:none">
                        <h5><strong>Ảnh sản phẩm (tối đa 4 ảnh)</strong></h5><br>
                        <app-img-upload :numberImg="4" :section="'itemPreview'"/>
                        <br>
                    </div>
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
    import { mapGetters } from 'vuex'

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
        middleware: 'auth',
        layout: 'shop',
        computed: {
            ...mapGetters(['itemLoading'])
        },
        async asyncData({ store, params }) {
            let loadedItem = {}
            if(store.getters.loadedShop) {
                loadedItem = await loadItem(store.getters.loadedItems, params.itemId)
                return {
                    loadedShop: store.getters.loadedShop,
                    loadedItem: loadedItem
                }
            }
            let [loadedShop, loadedItems] = await Promise.all([
                store.dispatch('loadShop', params.shopId),
                store.dispatch('loadItems', params.shopId)
            ])
            loadedItem  = await loadItem(loadedItems, params.itemId, params.shopId)
            return { 
                loadedShop: loadedShop,
                loadedItem: loadedItem
            }
        },
        methods: {
            openTab(event, arg) {
                let i, x, tablinks;
                x = document.getElementsByClassName("section");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                tablinks = document.getElementsByClassName("tablink");
                for (i = 0; i < x.length; i++) {
                    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
                }
                document.getElementById(arg).style.display = "block";
                event.currentTarget.firstElementChild.className += " w3-border-red";
            },
            onEditItem() {

            }
        }
    }
</script>