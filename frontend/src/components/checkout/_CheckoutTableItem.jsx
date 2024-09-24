import { useEffect } from 'react';
import { Table } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiMinusBoxOutline, mdiPlusBoxOutline, mdiTrashCanOutline } from '@mdi/js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toMoneyString } from '../../utils/helperFunctions';
export default function CheckoutItem({ p,setPriceBeforeTax,addQuantity,reduceQuntity,deleteItem }) {
  useEffect(()=>{
    if(p.length>0){
  setPriceBeforeTax(prev=>{
    const total = p.reduce((acc,curr)=>{
    acc= acc+curr.price
    return acc  
    },0)
    prev = total
    return prev
    })
  }
  },[p])
  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
    navigate(`/products/product/${product.slug}`, {
      state: { ...(location.state || {}), _id: product._id },
    });

  return p.map((product, i) => (
    <Table.Row key={`${product.productColor}-${i}`}>
      <Table.Cell className="flex">
        <div className="flex flex-col justify-center items-center ml-1">
          <div
            className="hover:text-green-500 text-gray-400 cursor-pointer"
            onClick={() => addQuantity(product.productColor,product.size)}
          >
            <Icon path={mdiPlusBoxOutline} size={1} />
          </div>
          <div
            className="hover:text-green-500 text-gray-400 cursor-pointer mb-2"
            onClick={() => reduceQuntity(product.productColor,product.size)}
          >
            <Icon path={mdiMinusBoxOutline} size={1} />
          </div>
          <div
            className="hover:text-red-500 text-gray-400 cursor-pointer"
            onClick={() => deleteItem(product.productColor,product.size)}
          >
            <Icon path={mdiTrashCanOutline} size={1} />
          </div>
        </div>
        <img
          className="min-w-16 h-20 object-cover m-auto rounded-lg"
          src={product.image}
          alt={product.productName}
        />
      </Table.Cell>
      <Table.Cell>
        <div
          className="text-center font-bold text-[#64b496] hover:underline cursor-pointer"
          onClick={goToProductPage}
        >
          {product.productName}
        </div>
      </Table.Cell>
      <Table.Cell className="text-right">
        <div className="min-w-14">
          {'צבע: '}
          {product.productColorName}
        </div>
        <div className="min-w-14">
          {'מידה: '}
          {product.size}
        </div>
        <div className="min-w-14">
          {'כמות: '}
          {product.quantity}
        </div>
        {/* producr.update is only for make the comp. rerender */}
        <div>{product.update}</div>
      </Table.Cell>
      <Table.Cell className="text-center">
        {/* {product.discountPrice && (
          <span className="mr-1 text-sm text-gray-500 line-through">
            {product.discountPrice}₪
          </span>
        )} */}
        <span className="mr-1 font-bold text-emerald-500 text-md">
          {toMoneyString(product.price)}
        </span>
      </Table.Cell>
    </Table.Row>
  ));
}
