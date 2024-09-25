import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { Card } from 'flowbite-react';
import { toMoneyString } from '../../utils/helperFunctions';
// Component:
export default function CartProductCard({ cart, cache, i, deleteProductFromLS }) {
  // const quntity = Object.values(cart[i].sizes);
  // const size = Object.keys(cart[i].sizes);
  const sizeANDquntity = Object.entries(cart[i].sizes);
  const sizesArr = Object.keys(cart[i].sizes);
  const quantityArr = Object.values(cart[i].sizes);
  const TotalQuantity = quantityArr.reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
  }, 0);

  return (
    <Card
      className="max-w-xs flex-row mb-1"
      horizontal
      renderImage={() => (
        <img
          className="w-1/3 object-cover"
          src={cache[i].image}
          alt={cache[i].productName}
        />
      )}
    >
      <div className="relative w-36">
        <div className="flex flex-col rtl">
          <h4 className="font-bold text-[#64b496]">{cache[i].productName}</h4>
          <div>
            {'צבע: '}
            {cache[i].productColorName}
          </div>

          {
            <div>
              {sizesArr.length > 1 ? 'מידות: ' : 'מידה: '}
              {sizesArr.join(', ')}
            </div>
          }

          {
            <div>
              {'כמות: '}
              {quantityArr.join(', ')}
              {/* {Object.entries(product.sizes).reduce((prev, [_, val]) => prev + val, 0)}
               */}
            </div>
          }
          <div>
            {'מחיר: '}
            {/* {product.discountPrice && (
              <span className="mr-1 text-sm text-gray-500 line-through">
                {product.discountPrice}₪
              </span>
            )} */}
            <span className="mr-1 font-bold text-emerald-500 text-md">
              {toMoneyString(cache[i].price * TotalQuantity)}
            </span>
          </div>
        </div>
        <div
          className="hover:text-red-500 text-gray-400 cursor-pointer absolute top-0 left-0"
          onClick={() => deleteProductFromLS(cart[i].productColor)}
        >
          <Icon path={mdiTrashCanOutline} size={1} />
        </div>
      </div>
    </Card>
  );
}
