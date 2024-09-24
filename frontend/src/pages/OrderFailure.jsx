import React, { useEffect, useRef, useState } from 'react';
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
      <div className="flex justify-center items-center min-h-screen bg-emerald-500 rtl">
        <Card className="max-w-md w-full text-center bg-white p-6">
          <h2 className="text-3xl font-bold text-emerald-500 mb-6">ביטול הזמנה</h2>
          <p className="text-xl text-gray-700 mb-4">
            ההזמנה בוטלה, {order.user.fullName}.
          </p>
          <p className="text-lg text-gray-600 mb-6">מספר הזמנה: {order._id}</p>
          <p className="text-lg text-gray-500">
            ההזמנה שלך מטבע נאות בוטלה בהצלחה. נשמח לראותך שוב בקרוב ולהעניק לך שירות
            מצוין.
          </p>
        </Card>
      </div>
    );
}
