<template>
    <el-card class="call">
        <el-row>
            <div class="total-cost">    
                {{cost}}$
            </div>
            <div class="point">
                <el-tag>{{data.src}}</el-tag>
            </div>
            <template v-for="(i,num) in data.des" :key="num" class="path">
                <div class="between">
                    <div style="line-height:22px;">
                        <el-tag type="warning">{{i.company}} {{i.price}}$</el-tag>
                        </div>
                    <img src="@/assets/right.svg" width="24" height="24" style="margin:auto"/>
                </div>
                <div style="">
                <el-tag class="point">
                    {{i.name}}
                </el-tag>
                </div>
            </template>
        </el-row>
    </el-card>
</template>

<script>
export default{
    props:{
        data:Object
    }, 
    computed:{
        cost(){
            return this.data.des.map(i=>i.price).reduce((i,j)=>i+j)
        }
    }, components:{}
}
</script>

<style scoped>
.between{
    display:flex;flex-direction:column;
    margin-left:20px;
    margin-right:20px;
}
.point, .total-cost{
    margin-top:22px
}
.total-cost{
    padding:10px;
    width:40px;
    margin-right: 20px;
}
.call{
    margin-bottom:6px;
}
</style>