<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div v-for="product in products" :key="product.id" class="col-md-2 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                    <div class="card-img">
                        <img :src="product.image" class="w-100" style="height: 15em">
                    </div>
                    <div class="card-body">
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="card-title font-weight-bold" style="font-size: 20px">
                            {{ product.title }}
                        </router-link>

                        <div class="discount mt-2">
                            <s>Rp. {{ moneyFormat(product.price) }}</s>

                            <span class="badge badge-pill badge-success text-white"> DISKON {{ product.discount }}</span>
                        </div>

                        <div class="price font-weight-bold mt-3">
                            Rp. {{ moneyFormat(calculateDiscount(product)) }}
                        </div>
                        <router-link :to="{name: 'detail_product', params:{slug: product.slug}}" class="btn btn-primary btn-md mt-3 btn-block shadeo-mg">lihat produk</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
export default {
    setup() {
        const store = useStore()
        const route = useRoute()

        onMounted(() => {
            store.dispatch('category/getCategories')
        })

        const categories = computed(() => {
            return store.state.category.categories
        })

        return {
            store,
            categories,
            route
        }
    }
}
</script>