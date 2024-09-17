// Imports:
import axios from 'axios';
import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import ProductColor from '../models/productColorModel.js';

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

const createItem = async function (item) {
  const { name } = await Product.findOne({ colors: item.productColor });
  const { name: color } = await ProductColor.findById(item.productColor);
  const quantity = [...item.sizes.values()].reduce((acc, val) => acc + val, 0);

  return {
    name: `${name} - ${color}`,
    quantity,
    unit_amount: {
      currency_code: 'ILS',
      value: item.price,
    },
  };
};

export const createPaypalOrder = async (order) => {
  try {
    const accessToken = await generatePaymentToken();

    const items = [];
    for (const product of order.products) items.push(await createItem(product));

    const { data } = await axios({
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
            items,
            amount: {
              currency_code: 'ILS',
              value: order.total,
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: order.total,
                },
              },
            },
            shipping: {
              address: {
                address_line_1: order.shippingAddress.address,
                admin_area_2: order.shippingAddress.city,
                postal_code: order.shippingAddress.postalCode,
                country_code: 'IL',
              },
              name: {
                full_name: order.user.fullName,
              },
            },
          },
        ],
        application_context: {
          return_url: `${process.env.FRONT_END}/order/complete?orderId=${order._id}`,
          cancel_url: `${process.env.FRONT_END}/order/cancel?orderId=${order._id}`,
          user_action: 'PAY_NOW',
          brand_name: 'טבע נאות',
        },
      }),
    });
    order.paypalOrderId = data._id;
    await order.save();

    return data.links.find((link) => link.rel === 'approve').href;
  } catch (err) {
    throw err;
  }
};

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
