<template>
<el-card>
  <el-form style='display:flex; flex-direction:column'>
      <el-form-item label="Звонящая сторона (Caller)" class="label-over">
        <el-select v-model="caller" placeholder="Select">
            <el-option
            v-for="(item, key) in countries"
            :key="key"
            :label="item"
            :value="key"
            >
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Принимающая сторона (Callee)" class="label-over">
        <el-select v-model="callee" placeholder="Select">
            <el-option
            v-for="(item,key) in countries"
            :key="key"
            :label="item"
            :value="key"
            >
            </el-option>
        </el-select>
      </el-form-item>

        <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >Все</el-checkbox
  >
  <el-checkbox-group
    style="display:flex; flex-direction:column;"
    v-model="selectedLength"
    @change="handleselectedLengthChange"
  >
    <el-checkbox v-for="(pl,num) in pathLength" :key="num" :label="pl.count">{{
      pl.name
    }}</el-checkbox>
  </el-checkbox-group>
  </el-form>
  <!-- {{selectedLength}} -->
  </el-card>
</template>

<script>
import {getRouteData} from "../api"
export default{
    name:"Filters",
    data(){
        return{
            selectedLength:[1],
            checkAll:false,
            caller:'',
            callee:'', 
            isIndeterminate:false,
            pathLength:[{count:0, name:'Прямое соединение'},
            {count:1, name:'Один дополнительный узел'},{count:2, name:'Два дополнительных узла'}],
        }
    }, 
    watch:{
      selectedLength(v){
        console.log(v);
        this.$emit('changeData',{
          caller:this.caller, callee:this.callee, length:[...v]
        })
      },
      caller(v){
        this.$emit('changeData',{
          caller:v, callee:this.callee,length:[...this.selectedLength]
        })
      },
      callee(v){
        this.$emit('changeData',{
          caller:this.caller, callee:v,length:[...this.selectedLength]
        })
      }
    },
    async mounted(){
      let rd = await getRouteData();
      console.log(rd);
      this.countries = rd.data.country;
    },
    methods:{
       handleCheckAllChange (val) {
        this.selectedLength = val ? this.pathLength.map(i=>i.count) : []
        this.isIndeterminate = false
        },
        handleselectedLengthChange (value)  {
          console.log(value)
        const checkedCount = value.length
        this.checkAll = checkedCount === this.countries.length
        this.isIndeterminate =
            checkedCount > 0 && checkedCount < this.countries.length
        }
    }

}
</script>

<style>
.label-over{
    width: auto!`important;
    float: none;
    display: inline-block !important;
    text-align: left;
    padding: 0 0` 10px;
}


</style>