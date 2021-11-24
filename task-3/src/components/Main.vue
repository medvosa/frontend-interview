<template>
  <Header/>
  <div class="hello">
      <el-row :gutter="6">
        <el-col :span=6>
          <Filters @changeData="setFilters"/>
        </el-col>
        <el-col :span=18>
          <Calls :caller="filters.caller" :callee="filters.callee" :length="filters.length"/>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Header from './Header.vue'
import Filters from './Filters'
import Calls from './calls.vue';
export default {
  name: 'HelloWorld',
  data(){
    return {
      filters:{
        caller:'',
        callee:'',
        length:[],
      }
    }
  },
  methods:{
    setFilters(v){
      console.log('up',v);
      this.filters=v
    }
  },
  props: {
    msg: String
  }, components:{Header, Filters, Calls}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
