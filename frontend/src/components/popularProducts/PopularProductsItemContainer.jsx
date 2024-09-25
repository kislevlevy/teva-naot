import { useEffect,useState } from 'react';
import ProductList from '../product/ProductList';
import { useGetPopularProductsQuery } from '../../slices/api/apiProductsSlices';
export default function PopularProductsItemContainer({ selectedCategory }) {
  const [productsGroupArr,setProductsGroupArr]=useState(null)
  const {data:popular=[],isLoading,isError,isSuccess}=useGetPopularProductsQuery()
    //         data: posts = [],
    //         isLoading,
    //         isFetching,
    //         isSuccess,
    //         isError,
    //         error,
    //         refetch
    //     } = useGetPostsQuery()
   const displayProducts = ()=>{
     switch(selectedCategory ) {
       case "הצג הכל":
         setProductsGroupArr(prev=>(prev=[...popular.data.
          discountedProductColors,...popular.data.topSoldProducts]))
         break;
         case "מוצרים פופולריים":
           setProductsGroupArr(prev=>(prev=popular.data.
            discountedProductColors
            ))
           break;
           case "מוצרים נבחרים":
             setProductsGroupArr(prev=>(prev=popular.data.topSoldProducts))
             break
             default:
  }
}
useEffect(() => {
  //SEND APIREQ FOR THE 3 CARDS OF THE REQUESTED TOPIC
  if(isSuccess){
      console.log(popular.data)
      displayProducts()
    }
  }, [selectedCategory,isSuccess]);
  return (
    <div className="product-content flex flex-grow flex-wrap w-full mb-6">
    {productsGroupArr&&
  <ProductList productsGroupArr={productsGroupArr} />
    }
    </div>
  );
}
