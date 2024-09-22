export const addProductsToLocalStorage = (
  product,
  currentProductColor,
  currentSize,
) => {
  let cart = JSON.parse(localStorage.getItem('productCart'));
  //localstorage is emty
  if (!cart) {
    localStorage.setItem('productCart', JSON.stringify(createNewCartProductObj()));
    //local storage is not empty
  } else {
    let productCartObj = JSON.parse(localStorage.getItem('productCart'));
    const _product =  productCartObj.cart.find(obj=>obj.productColor===currentProductColor._id)
// the new color that has been selected is not in localstorage
if(!_product){
  addNewProduct(productCartObj)
// the new color that has been selected is in localstorage
   }else{
  const existingObj = productCartObj.cart.find(obj=>obj.productColor===currentProductColor._id)
  let sizesObj = existingObj.sizes 
//check if the size is exist
  const sizeExist = Object.keys(sizesObj).find(size=>size==currentSize)
//size is exist
if(sizeExist){
  productCartObj.cart=productCartObj.cart.map(obj=>{
    if(obj.productColor===currentProductColor._id){
      const newObj = {...obj,sizes:{...obj.sizes,[sizeExist]:obj.sizes[sizeExist] +1}}
 return newObj
}else{
  return obj
}
})
//size is not exist
}else{
  productCartObj.cart=productCartObj.cart.map(obj=>{
    if(obj.productColor===currentProductColor._id){
      const newObj = {...obj,sizes:{...obj.sizes,[currentSize]: 1}}
      return newObj
    }else{
      return obj
    }
  })
  
}
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
  let productCartObj = JSON.parse(localStorage.getItem('productCart'));
  return { productCartObj };
};

export const deleteItemFromLS = (id)=>{

  let productCartObj  = JSON.parse(localStorage.getItem('productCart'));
  let LS;
  if(productCartObj){
    if(productCartObj.cart.length==1){
     LS= localStorage.removeItem('productCart')
      return LS
    }else{
    const i = productCartObj.cart.findIndex(obj=>obj.productColor==id)
    productCartObj.cart=productCartObj.cart.filter((_,index)=>index!=i)
    productCartObj.cache=productCartObj.cache.filter((_,index)=>index!=i)
      LS= localStorage.setItem('productCart', JSON.stringify(productCartObj))
      return LS
    }

  }
}

export const updateQuantity = (id,size)=>{
  let update=false
  let productCartObj  = JSON.parse(localStorage.getItem('productCart'));
  if(productCartObj){
    productCartObj.cart = productCartObj.cart.map((obj)=>{
  if(obj.productColor==id&&obj.sizes[size]){
  const newObj = {...obj,sizes:{...obj.sizes,[size]:Number(obj.sizes[size])+1}}
  
  return newObj
}else{
  return obj
}
})  
localStorage.setItem('productCart', JSON.stringify(productCartObj))
  update=true
  }
  return update
}
