export const addProductsToLocalStorage = (product,currentProductColor,currentSize) => {
  let cart = JSON.parse(localStorage.getItem('productCart'));
  if (!cart) {
    localStorage.setItem('productCart', JSON.stringify(createNewCartProductObj()));
  } else {
    let productCartObj = JSON.parse(localStorage.getItem('productCart'));
    const _product =  productCartObj.cart.find(obj=>obj.productColor===currentProductColor._id)
    if(!_product){
  addNewProduct(productCartObj)
   }else{
    const up = productCartObj.cart.find(obj=>obj.productColor===currentProductColor._id)
    console.log(up.sizes)
    let updateSizeObj ;
    let sizesObj = up.sizes 
    for(let key in sizesObj ){
      updateSizeObj = {[key]:up.sizes[key]+1} 
    }
    productCartObj.cart = productCartObj.cart.map(obj=>{
    if(obj.productColor===currentProductColor._id){
     const newObj = {...obj,sizes:updateSizeObj}
     return newObj
    }else{
      return obj
    }
    })
    localStorage.setItem('productCart', JSON.stringify(productCartObj));
   }
  }

function createNewCartProductObj(){

  const objTolocalStorage = {
    cart: [
      {
        productColor:currentProductColor._id,
        sizes: {
          [currentSize]: 1,
        },
      },
  
  ],
  cache: [
    {
      image:currentProductColor.images[0],
      price:currentProductColor.price,
      productName:product.name,
      productColorName:currentProductColor.name,
    },
    
  ],
};
return objTolocalStorage
}
function addNewProduct(productCart){
  const cartProd =     {
    productColor:currentProductColor._id,
    sizes: {
      [currentSize]: 1,
    },
  }
  const cacheProduct=   {
    image:currentProductColor.images[0],
    price:currentProductColor.price,
    productName:product.name,
    productColorName:currentProductColor.name,
  }

productCart.cart.push(cartProd)
productCart.cache.push(cacheProduct)
localStorage.setItem('productCart', JSON.stringify(productCart))

}
}



export const retrieveFromLocalStorage = () => {
  let productCartObj  = JSON.parse(localStorage.getItem('productCart'));
  return { productCartObj };
};
