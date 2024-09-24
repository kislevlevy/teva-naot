import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Card } from 'flowbite-react';

import { useOrderSuccessMutation } from '../slices/api/apiOrdersSlices';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const token = params.get('token');
  const [order, setOrder] = useState(null);

  const [orderSuccess] = useOrderSuccessMutation();

  const handlePaypal = async () => {
    try {
      const data = await orderSuccess({ orderId, token });
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
  }, [token]);

  if (order)
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-500 rtl">
        <Card className="max-w-md w-full text-center bg-white p-6">
          <h2 className="text-3xl font-bold text-emerald-500 mb-6">אישור הזמנה</h2>
          <p className="text-xl text-gray-700 mb-4">
            תודה על ההזמנה, {order.user.fullName}!
          </p>
          <p className="text-lg text-gray-600 mb-6">מספר הזמנה: {order._id}</p>
          <p className="text-lg text-gray-500">
            תודה על ההזמנה שלך מטבע נאות. ההזמנה שלך הועברה לנציגי המכירות שלנו
            וברגעים אלו נשלח אליך דוא"ל אישור הזמנה מ
            <span className="eng-font">PayPal.</span>
          </p>
        </Card>
      </div>
    );
}
