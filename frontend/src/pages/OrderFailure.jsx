import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Card } from 'flowbite-react';

import { useOrderFailureMutation } from '../slices/api/apiOrdersSlices';

export default function OrderFailure() {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const [order, setOrder] = useState(null);

  const [orderFailure] = useOrderFailureMutation();

  const handlePaypal = async () => {
    try {
      const data = await orderFailure({ orderId });
      setOrder(data?.data.data.order);
    } catch (_) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handlePaypal();
    }
  }, [orderId]);

  if (order)
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-500 rtl">
        <Card className="w-full max-w-md p-6 text-center bg-white">
          <h2 className="mb-6 text-3xl font-bold text-emerald-500">ביטול הזמנה</h2>
          <p className="mb-4 text-xl text-gray-700">
            ההזמנה בוטלה, {order.user.fullName}.
          </p>
          <p className="mb-6 text-lg text-gray-600">מספר הזמנה: {order._id}</p>
          <p className="text-lg text-gray-500">
            ההזמנה שלך מטבע נאות בוטלה בהצלחה. נשמח לראותך שוב בקרוב ולהעניק לך שירות
            מצוין.
          </p>
        </Card>
      </div>
    );
}
