import { useEffect, useState,useRef,useCallback,useMemo } from 'react';
import { Table } from 'flowbite-react';
import CheckoutItem from './_CheckoutTableItem';
import { retrieveFromLocalStorage } from '../../utils/localStorage';
import { updateQuantity } from '../../utils/localStorage';

export default function CheckoutTable({setPriceBeforeTax}) {
  const {productCartObj} = retrieveFromLocalStorage();
  const [_product,setProduct]=useState([])
  const [update,setUpdate]=useState(false)
  const productRef = useRef(productCartObj).current
  // const LS = useMemo(()=>{
  //   const {productCartObj} = retrieveFromLocalStorage();
  //   return productCartObj
  // },[productCartObj])
  useEffect(()=>{
    if(update){
  const {productCartObj} = retrieveFromLocalStorage();
  productRef.current=productCartObj
  console.log(productRef.current)
}  
if(productRef?.cart.length>0){
  const {productCartObj} = retrieveFromLocalStorage();
  const {cart,cache} = productCartObj
  setProduct(prev=>{ 
    prev=[]
  cache.map((obj,i)=>{
    const newObj = {
    productColor:cart[i].productColor,
    image:obj.image,
    productName:obj.productName,
    productColorName:obj.productColorName,
    update:[update]
    }
    prev=[...prev,newObj]
  })
  let finalArr=[]
  prev.map((obj,i)=>{
let newObj;
  Object.entries(cart[i].sizes).map((zisesArr)=>{
newObj =  {...obj,
  size:zisesArr[0],
  quantity:zisesArr[1],
  price:cache[i].price * zisesArr[1],
  }
  finalArr.push(newObj)
})
  })
  prev=finalArr
  return prev
  })
  console.log(update)
  setUpdate(false)
}

},[productRef,update])
const addQuantity = (id,size)=>{
  const update =  updateQuantity(id,size)
  if(update)setUpdate(update)
}
  return (
    <Table
      hoverable
      className="bg-white"
      theme={{
        root: {
          base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 rounded-lg shadow-lg',
        },
        head: {
          cell: {
            base: 'bg-gray-50 px-6 py-3 dark:bg-gray-700 rounded-t-lg',
          },
        },
      }}
    >
      <Table.Head>
        <Table.HeadCell className="text-center">פריט</Table.HeadCell>
        <Table.HeadCell className="text-center">שם</Table.HeadCell>
        <Table.HeadCell className="text-center">מידע</Table.HeadCell>
        <Table.HeadCell className="text-center">מחיר</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        <CheckoutItem p={_product} setPriceBeforeTax={setPriceBeforeTax} addQuantity={addQuantity} update={update} />
      
      </Table.Body>
    </Table>
  );
}
