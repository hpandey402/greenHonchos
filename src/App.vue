<template>
  <div class="prod-list" id="infinite-list">
    <the-header :title="'Top-Wear'" />
    <div
      class="container"
      v-if="!topWearFilters.length && !topWearProductsClone.length"
    >
      <div class="spinner-border"></div>
    </div>

    <div class="top-wear" v-else>
      <filter-data
        :filterData="topWearFilters"
        @filter-products="filterData"
      ></filter-data>
      <top-wear
        :productsData="topWearProductsClone"
        :loader="loader"
      ></top-wear>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import FilterData from './components/Filter.vue';
import TopWear from './components/TopWear.vue';
import topwearService from './services';

export default {
  name: 'App',
  components: {
    TheHeader,
    FilterData,
    TopWear,
  },
  data() {
    return {
      topWearProducts: [],
      topWearProductsClone:[],
      topWearFilters: [],
      loader: false,
      scrollcheck:true
    };
  },
  mounted() {
    const listElm = document.querySelector('#infinite-list');
    if(this.scrollcheck){
      listElm.addEventListener('scroll', async () => {
        this.loader = true;
        if (
          listElm.scrollTop + listElm.clientHeight + 10 >=
          listElm.scrollHeight
        ) {
          const data = await topwearService.topWearsProductsData();
          data.splice(data.length - 10, 10);
          this.topWearProducts.push(...data);
          this.topWearProductsClone = [...this.topWearProducts];
          this.loader = false;
        }
      });
      
    }
  },

  created() {
    this.getTopwears();
    this.getFilters();
  },
  methods: {
    async getTopwears() {
      this.topWearProducts = await topwearService.topWearsProductsData();
      this.topWearProductsClone = [...this.topWearProducts];
    },
    async getFilters() {
      this.topWearFilters = await topwearService.topWearsfiltersData();
    },
    filterData(arrFilter) {
      let price;
      if(arrFilter.length){
        this.scrollcheck =false;
        arrFilter.forEach(val=>{
          switch (val.code) {
            case 'selling_price':
              price = val.value_key.split(',');
              this.topWearProductsClone = this.topWearProductsClone.filter((prod) => {
                if (
                  parseInt(prod.price) > price[0] &&
                  parseInt(prod.price) <= price[1]
                ) {
                  return true;
                }
                return false;
              });
              break;
    
            case 'product_category':
              this.topWearProductsClone = this.topWearProductsClone.filter((prod) => {
                if (
                  prod.product_category && (prod.product_category.toLowerCase() == val.value.toLowerCase())
                ) {
                  return true;
                }
                return false;
              });
              break;
          }

        })

      }
      else{
        this.topWearProductsClone = [...this.topWearProducts];
        this.scrollcheck =true;
      }
    },
  },
};
</script>

<style scoped>
.top-wear {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
}
.prod-list {
  overflow-y: scroll;
  height: 100vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
</style>
