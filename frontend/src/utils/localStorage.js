
export const addProductsToLocalStorage =(cart={},cache={})=>{
let oldcart = JSON.parse(localStorage.getItem('cart'));
let oldcache = JSON.parse(localStorage.getItem('cache'));
if(!oldcart){
    oldcart=[cart]
    oldcache=[cache]
    localStorage.setItem('cart', JSON.stringify(oldcart))
    localStorage.setItem('cache', JSON.stringify(oldcache))
}else{
//     if(!oldcart.find(obj=>obj.productColor===cart.productColor)&&
//         !oldcart.find(obj=>Object.keys(obj.sizes)[0]===Object.keys(cart.sizes)[0])
// )
if(!checkIfExist(cart,oldcart)){
        oldcart.push(cart)
        oldcache.push(cache)
        localStorage.setItem('cart', JSON.stringify(oldcart))
        localStorage.setItem('cache', JSON.stringify(oldcache))
}
}
}

function checkIfExist(cart,oldcart){
const productExist = oldcart.find(obj=>{
 return Object.entries(obj.sizes)[0][0] == Object.entries(cart.sizes)[0][0] &&
Object.entries(obj.sizes)[0][1] == Object.entries(cart.sizes)[0][1];
})
return productExist
}
export const retrieveFromLocalStorage = ()=>{
 let cartArr = JSON.parse(localStorage.getItem('cart'));
 let cacheArr = JSON.parse(localStorage.getItem('cache'));
 return{cartArr,cacheArr}
}