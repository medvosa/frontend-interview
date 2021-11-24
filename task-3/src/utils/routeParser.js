// обработка данных для фильтрации ит отображения

/* собирает одномерный массив из путей в формате
[
    {
        company: "waterTel",
        src: "ru",
        des: "kz",
        price: 31
    }
]
*/
export function flatten(d){
    let companyData = d.company;
    let res = [];
    for(let i in companyData){
        res = [
            ...res,
            ...(companyData[i].map(j=>({
                company:i,
                ...j
            })))
        ];
    }
    return res;
}

/* собирает объект со всеми прямыми маршрутами из старны в формате
{
    "kz":[
        {
            company:...,
            src:"kz",
            des:...,
            price
        }
    ]
}
*/
export function countryRoutes(allRoutes, countries){
    let res = {};
    for(let i of countries)
        res[i] = allRoutes.filter(j=>j.src==i)
    return res;
}

/* собирает объект со всеми прямыми маршрутами из старны в формате
{
    "kz":{
        de:[
            {
                company:...,
                price
            }
        ]
    }
}
*/
export function countryPairRoutes(d){
    function oneCountryToObj(arr){
        let res = {};
        for (let i of arr){
            if(res[i.des]){
                res[i.des].push({company:i.company, price:i.price})
            }else{
                res[i.des]=[{company:i.company, price:i.price}]
            }
        }
        return res;
    }
    let countries = Object.keys(d);
    let res = {};
    for(let i of countries){
        res[i]=oneCountryToObj(d[i])
    }
    return res;
}

/* Выдает список всех стран в которые можно доехать без пересадки */
export function allLinked(pairs, from){
    return Object.keys(pairs[from])
}

/* выдает список неявно сзвзаннызх с данной стран со списком старан через которые проходит связь */
export function allLinkedCount(pairs, from ,count){
    if(count<1) return [];
    let adjascent = allLinked(pairs, from);
    if(count==1){
        return adjascent.map(i=>({
            des:i, path:[i]
        }))
    }

    let t = adjascent.map(i=>{
        let iAdjascent = allLinkedCount(pairs, i, count-1)
        let addedPath = iAdjascent.map(j=>({
            des:j.des, 
            path:[i,...j.path]
        }))
        console.log('ap',addedPath);
        let res = [];
        for (let i of addedPath){
            console.log('iii',res, i)
            res = [...res, i]
        }
            // console.log('res',res)
        return res;
    })
    console.log('br', t)
    let res = [];
    for(let k of t)
        res = [...res,...k]
    return res
}

/* список переездов в формате 
[
    ["ru","kz"],["kz","usa"]
]*/
export function toRouteList(data, from){
    console.log('data trl',data)
    let res = data.map(i=>{
        let t = [[from,i.path[0]]];
        for(let j=1; j<i.path.length; j++)
            t.push([i.path[j-1],i.path[j]])
        return t;
    })
    return res;
}

export function onlyTo(routeLists, to){
    function isTo(rl){
        if(!rl.length) return false;
        return rl[rl.length-1][1]==to
    }
    return routeLists.filter(isTo)
}