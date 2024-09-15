// Imports:
import axios from 'axios';
import asyncHandler from 'express-async-handler';

// Functions:
const generatePaymentToken = async () => {
  const response = await axios({
    url: process.env.PAYPAL_URL + '/v1/oauth2/token',
    method: 'post',
    data: 'grant_type=client_credentials',
    auth: {
      username: process.env.PAYPAL_ID,
      password: process.env.PAYPAL_KEY,
    },
  });
  return response.data.access_token;
};

export const createPaypalOrder = asyncHandler(async () => {
  const accessToken = await generatePaymentToken();

  const response = await axios({
    url: process.env.PAYPAL_URL + '/v2/checkout/orders',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    data: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: 'product',
              description: 'description',
              quantity: 1,
              unit_amount: {
                currency_code: 'ILS',
                value: '100.00',
              },
            },
          ],
          amount: {
            currency_code: 'ILS',
            value: '100.00',
            breakdown: {
              item_total: {
                currency_code: 'ILS',
                value: '100.00',
              },
            },
          },
        },
      ],
      application_context: {
        return_url: process.env.FRONT_END + '/order/complete',
        cancel_url: process.env.FRONT_END + '/order/cancel',
        user_action: 'PAY_NOW',
        brand_name: 'טבע נאות',
      },
    }),
  });
  return response.data.links.find((link) => link.rel === 'approve').href;
});

export const capturePaypalPayment = asyncHandler(async (orderId) => {
  const accessToken = await generatePaymentToken();

  const response = await axios({
    url: `${process.env.PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
});
