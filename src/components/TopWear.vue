<template>
  <div class="container">
    <div class="row" v-if="productsData.length">
      <div class="col-lg-4" v-for="(product, ind) in productsData" :key="ind">
        <div
          class="card"
          @mouseover="product['upHere'] = true"
          @mouseleave="product['upHere'] = false"
        >
          <base-card>
            <img
              :src="product.image"
              class="card-img-top"
              :alt="product.drm_category"
            />
          </base-card>
          <div class="card-body" style="min-height: 120px">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Rs. {{ product.price }}</p>
            <transition name="fade">
              <span v-show="product['upHere']"
                >Size - {{ size(product.size) }}</span
              >
            </transition>
          </div>
        </div>
      </div>
        <div class="container" v-if="loader">
      <div class="spinner-border"></div>
    </div>
    </div>
    <div class="row" v-else>
      <h1>No Data</h1> 
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'top-wear',
  props: ['productsData', 'loader'],

  computed: {
    size() {
      return (value) => {
        if (!value) return '';
        value = value
          .split(',')
          .map((el) => {
            let stack = [];
            for (let i of el) {
              if (i != '[' && i != ']') {
                stack.push(i);
              }
            }
            return stack.join('');
          })
          .join(' ');

        return value;
      };
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.spinner-border {
  width: 5rem;
  height: 5rem;
}
/* always present */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.5s linear;
}
.list-prod {
  box-sizing: border-box;
  overflow: scroll;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
</style>
