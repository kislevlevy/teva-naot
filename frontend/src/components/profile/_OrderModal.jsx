import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiTruckFastOutline } from '@mdi/js';
import { Modal, Table } from 'flowbite-react';
import { useGetProductColorByIdQuery } from '../../slices/api/apiProductsColorsSlices';

import { slugify } from '../../utils/slugify';
import ReviewPopover from './subComponents/_ReviewPopover';

export default function OrderModal({ isOrderOpen, setIsOrderOpen }) {
  const [products, setProducts] = useState([]);
  const currentUser = useSelector((state) => state.userState.user);

  useEffect(() => {
    if (currentUser?._id)
      setProducts(currentUser?.orderHistory[Number(isOrderOpen)].products);
  }, [currentUser]);

  if (products)
    return (
      <Modal
        dismissible
        show={isOrderOpen}
        onClose={() => {
          setIsOrderOpen('');
        }}
        size="lg"
      >
        <Modal.Header>
          <Icon path={mdiTruckFastOutline} size={1} />
        </Modal.Header>
        <Modal.Body className="overflow-y-scroll min-h-72 rtl">
          <Table hoverable>
            <Table.Head className="text-center">
              <Table.HeadCell>תמונה</Table.HeadCell>
              <Table.HeadCell>צבע</Table.HeadCell>
              <Table.HeadCell>מחיר</Table.HeadCell>
              <Table.HeadCell>פעולות</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product, i) => (
                <TableItem product={product} key={'product-' + i} />
              ))}
            </Table.Body>
          </Table>
        </Modal.Body>
      </Modal>
    );
}

function TableItem({ product }) {
  const [productColor, setProductColor] = useState();
  const { data, isSuccess } = useGetProductColorByIdQuery(product.productColor);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) setProductColor(data.data.doc);
  }, [isSuccess]);

  if (productColor)
    return (
      <Table.Row className="text-sm text-center bg-white">
        <Table.Cell>
          <img className="rounded-lg" src={productColor.images[0]} />
        </Table.Cell>
        <Table.Cell>{productColor.name}</Table.Cell>
        <Table.Cell>{product.price}₪</Table.Cell>
        <Table.Cell>
          <div className="w-24 h-24 space-y-1">
            <button
              onClick={() =>
                navigate(`/products/product/${slugify(productColor.name)}`, {
                  state: { ...(location.state || {}), _id: productColor.product },
                })
              }
              className="w-full px-3 py-1 text-xs text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
            >
              פתח עמוד מוצר
            </button>
            <ReviewPopover productId={productColor.product}>
              <button className="w-full px-3 py-1 text-xs text-white rounded-md bg-emerald-500 hover:bg-emerald-600">
                הוסף פידבק
              </button>
            </ReviewPopover>
          </div>
        </Table.Cell>
      </Table.Row>
    );
}
