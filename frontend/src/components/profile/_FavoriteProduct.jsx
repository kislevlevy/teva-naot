import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import { Card } from 'flowbite-react';

import { useGetProductByIdQuery } from '../../slices/api/apiProductsSlices';

export default function FavoriteProduct() {
  const likedItems = useSelector((state) => state.userState.likedItems);

  useEffect(() => {}, [likedItems]);
  return (
    <Card className="mt-5">
      <div dir="rtl">
        <h2 className="text-xl font-bold">מוצרים אהובים</h2>
        <Container className="flex p-2 mt-5 overflow-x-scroll gap-x-3">
          {likedItems.length > 0 ? (
            likedItems.map((ele, i) => (
              <OneFavorite productId={ele} key={'favorite-' + i} />
            ))
          ) : (
            <p>עוד לא סימנת מוצרים כאהובים!</p>
          )}
        </Container>
      </div>
    </Card>
  );
}

function OneFavorite({ productId }) {
  const { data, isSuccess } = useGetProductByIdQuery(productId);
  const navigate = useNavigate();

  if (isSuccess)
    return (
      <Card
        className="w-40 cursor-pointer min-w-40 hover:brightness-95"
        imgSrc={data.data.doc.image}
        onClick={() =>
          navigate(`/products/product/${data.data.doc.slug}`, {
            state: { ...(location.state || {}), _id: data.data.doc._id },
          })
        }
      >
        <h2 className="text-sm text-center">{data.data.doc.name}</h2>
      </Card>
    );
}
