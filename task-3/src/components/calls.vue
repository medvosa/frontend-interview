<template>
    <call v-for="i in showRoutes.filter(i=>i.src==caller).sort((i,j)=>j.des.map(i=>i.price).reduce((i,j)=>i+j)>i.des.map(i=>i.price).reduce((i,j)=>i+j))" :key="i" :data="i">
    </call>
</template>

<script>
function minPrice(arr){
    let need = arr[0];
    for(let i of arr){
        if(i.price<need.price )
            need = i
    }
    // alert(JSON.stringify(need))
    return need
}

import Call from './call.vue'
import {flatten, countryRoutes, countryPairRoutes, allLinked, allLinkedCount, toRouteList, onlyTo} from '../utils/routeParser';
import {getRouteData} from '../api'
export default{
    methods:{
        async calculateRoutes(from, length, to){
            // let from = 'kz'
            let allData = await getRouteData();
            let countries = Object.keys(allData.data.country);
            countryRoutes, countryPairRoutes, allLinked, allLinkedCount;
            // let routesByCountry = countryRoutes(flatten(allData.data), countries)
            let routesByCountryPair = countryPairRoutes(countryRoutes(flatten(allData.data), countries));
            console.log('routes by cp', routesByCountryPair)
            // let links  = allLinked (routesByCountryPair, 'usa')
            let combinedRoutes = [];
            for(let k of length){
                let all1 = allLinkedCount(routesByCountryPair,from,k);
                let routeList = toRouteList(all1, from);
                combinedRoutes = [...combinedRoutes,...routeList];
            }
            let resRoutes = onlyTo(combinedRoutes,to)
            console.log('cr',
                    // links,
                    // all1,'trl',
                    combinedRoutes, resRoutes, JSON.stringify(resRoutes))
            this.showRoutes = resRoutes;
            function arrTosrcDes(ar){
                let src = ar[0][0];
                return {
                    src, des:ar.map(i=>({
                        name:i[1],
                        ...minPrice(routesByCountryPair[i[0]][i[1]]),//-1234
                    }))
                }
            }
            console.log('min price from USA to DE is:', minPrice(routesByCountryPair['usa']['de']))
            this.showRoutes = this.showRoutes.map(arrTosrcDes)
            // console.log('SHOW ROUTE ',routeList[0].map(i=>i[0]))
        }
    },
    watch:{
        caller(v){
            // for(let i of this.length)
            this.calculateRoutes(v, this.length.map(i=>i+1), this.callee);
        },
        callee(v){
            // for(let i of this.length)
            this.calculateRoutes(this.caller, this.length.map(i=>i+1), v);
        },
        length(v){
            this.calculateRoutes(this.caller, v.map(i=>i+1), this.callee);
        }
    },
    mounted(){
        console.log('a')
        this.calculateRoutes('ru');
    },
    data(){
        return{
            showRoutes:[],
            list:[
                {
                    src:"ru",
                    des:[
                        {name:"kz",price:10}
                    ]
                },{
                    src:"ru",
                    des:[
                        {name:"cn",price:210},
                        {name:"kz",price:10},
                    ]
                }
            ]
        }
    }, 
    props:{
        caller:String, 
        callee:String,
        length:Array
    },
    components:{Call}
}
</script>
