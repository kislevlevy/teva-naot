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
         setProductsGroupArr(prev=>(prev=popular.data.products))
         break;
         case "מוצרים פופולריים":
           setProductsGroupArr(prev=>(prev=popular.data.products))
           break;
           case "מוצרים נבחרים":
             setProductsGroupArr(prev=>(prev=popular.data.products))
             break
             default:
  }
}
useEffect(() => {
  //SEND APIREQ FOR THE 3 CARDS OF THE REQUESTED TOPIC
  if(isSuccess){
      console.log(popular.data.products)
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
