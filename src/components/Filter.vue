<template>
  <div class="accordion">
    <h2>Filter section</h2>
    <div
      class="accordion-item"
      v-for="filrData in filterData"
      :key="filrData.filter_lable"
    >
      <h4 class="accordion-header" @click="filrData['isShow'] = !filrData['isShow']" >
        <p>
          {{ filrData.filter_lable }}
        </p>
        <p>
          <i class="fas fa-caret-up"  v-if="filrData['isShow']"></i>
          <i class="fas fa-caret-down" v-else></i>
        </p>
      </h4>
      <div class="accordion-body" v-if="filrData['isShow']" >
        <div class="form-check"  v-for="filrCat in filrData.options" :key="filrCat.value_key">
          <input
            class="form-check-input"
            type="checkbox"
            @change.prevent="filterValue(filrCat)"
            :id="filrCat.value_key"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{filrCat.value}}
          </label>
        </div>
      </div>
    </div>
   
  </div>

</template>

<script>
export default {
  name: 'top-wear-filters',
  emits:['filter-products'],
  props: ['filterData'],
  data(){
    return{
      filtrArr:[]
    }
  },
  methods:{
    filterValue(filterCat){
      filterCat['checked'] = !filterCat['checked'];
      const filterIndex =  this.filtrArr.findIndex(el=> el.value_key == filterCat.value_key);
      if(filterIndex >-1 && !filterCat['checked']){
        this.filtrArr.splice(filterIndex, 1)
      }else{
        this.filtrArr.push(filterCat);
      }
      this.$emit('filter-products', this.filtrArr);
    }
  }

};
</script>

<style scoped>
.accordion {
  width: 400px;
}
.accordion-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.8rem 1.25rem;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    overflow-anchor: none;
    transition: color .2s ease-in-out;
        color: #0c63e4;
    background-color: #e7f1ff;
    box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
}
</style>
