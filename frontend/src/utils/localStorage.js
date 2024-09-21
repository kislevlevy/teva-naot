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
    const _product = productCartObj.cart.find(
      (obj) => obj.productColor === currentProductColor._id,
    );
    // the new color that has been selected is not in localstorage
    if (!_product) {
      addNewProduct(productCartObj);
      // the new color that has been selected is in localstorage
    } else {
      const existingObj = productCartObj.cart.find(
        (obj) => obj.productColor === currentProductColor._id,
      );
      let sizesObj = existingObj.sizes;
      const selectedSize = Object.keys(sizesObj);

      /*
      let updateSizeObj;
      for (let key in sizesObj) {
        if (key == selectedSize) {
          {
            sizesObj, (sizesObj[key] = sizesObj[key] + 1);
          }
          updateSizeObj = { [key]: existingObj.sizes[key] + 1 };
        } else {
          {
            sizesObj, (sizesObj[key] = 1);
          }
        }
      }
      productCartObj.cart = productCartObj.cart.map((obj) => {
        if (obj.productColor === currentProductColor._id) {
          //  const newObj = {...obj,sizes:updateSizeObj}
          const newObj = { ...obj, sizesObj };
          return newObj;
        } else {
          return obj;
        }
      });
      */
      localStorage.setItem('productCart', JSON.stringify(productCartObj));
    }
  }

  function createNewCartProductObj() {
    const objTolocalStorage = {
      cart: [
        {
          productColor: currentProductColor._id,
          sizes: {
            [currentSize]: 1,
          },
        },
      ],
      cache: [
        {
          image: currentProductColor.images[0],
          price: currentProductColor.price,
          productName: product.name,
          productColorName: currentProductColor.name,
        },
      ],
    };
    return objTolocalStorage;
  }
  function addNewProduct(productCart) {
    const cartProd = {
      productColor: currentProductColor._id,
      sizes: {
        [currentSize]: 1,
      },
    };
    const cacheProduct = {
      image: currentProductColor.images[0],
      price: currentProductColor.price,
      productName: product.name,
      productColorName: currentProductColor.name,
    };

    productCart.cart.push(cartProd);
    productCart.cache.push(cacheProduct);
    localStorage.setItem('productCart', JSON.stringify(productCart));
  }
};

export const retrieveFromLocalStorage = () => {
  let productCartObj = JSON.parse(localStorage.getItem('productCart'));
  return { productCartObj };
};
