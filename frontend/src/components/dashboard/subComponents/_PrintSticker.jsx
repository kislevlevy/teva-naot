import React, { useRef } from 'react';

import Icon from '@mdi/react';
import { mdiPrinter } from '@mdi/js';

import { toDateString, toMoneyString } from '../../../utils/helperFunctions';

export default function PrintSticker({ order }) {
  const iframeRef = useRef(null);

  const createProductEntry = (product) => {
    const [sizes, quantity] = Object.entries(product.sizes).reduce(
      (prev, [key, val]) => [prev[0] + ', ' + key, prev[1] + val]
    );

    return `
    <li>
        <strong>P/N: ${product.productColor}</strong>
        </br>
         Size: ${sizes}, Price: ${toMoneyString(
      product.price * quantity
    )}, Quantity: ${quantity}
    </li>`;
  };

  const openModal = () => {
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(`
          <html>
            <head>
              <title>Shipment Sticker</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                .sticker {
                  padding: 20px;
                  border: 1px solid black;
                  max-width: 600px;
                  margin: auto;
                }
                .header,
                .footer {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 20px;
                }
                ul {
                  list-style-type: disc;
                  margin-left: 20px;
                }
              </style>
              <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/barcodes/JsBarcode.code128.min.js"></script>

            </head>
            <body>
              <div class="sticker">
                <div class="header">
                  <div>
                    <p><strong>Shipping to:</strong> ${order.user.fullName}</p>
                    <p>Email: ${order.user.email}</p>
                    <p>Phone: ${order.user.phoneNumber}</p>
                  </div>
                  <div>
                    <img
                      src="https://res.cloudinary.com/drxtaxnkr/image/upload/v1727082487/logoFooter_jpdwcm.svg"
                      alt="Company Logo"
                      style="width: 100px"
                    />
                  </div>
                </div>

                <hr />

                <div>
                  <p><strong>Shipping Address:</strong></p>
                  <p>${order.shippingAddress.address}</p>
                  <p>
                    ${order.shippingAddress.city}
                    ${order.shippingAddress.postalCode}
                  </p>
                </div>

                <hr />

                <div>
                  <h4>Products:</h4>
                  <ul>
                    ${order.products
                      .map((product) => createProductEntry(product))
                      .join('')}
                  </ul>
                </div>

                <hr />

                <div class="footer">
                  <div>
                    <p><strong>Date of Order:</strong>
                    <br/>
                    ${toDateString(order.orderDate)}</p>
                  </div>
                  <div>
                    <p><strong>Total Price:</strong>
                    <br/>
                    ${toMoneyString(order.total)}</p>
                  </div>
                </div>
                <svg id="barcode"></svg>
              </div>

              <script>
                window.onload = function () {
                  JsBarcode("#barcode", "${order._id}", {
                    format: "CODE128",
                    displayValue: true,
                    fontSize: 18
                  });

                  window.print();
                  window.onafterprint = window.close(); // Close the iframe after printing
                };
              </script>
            </body>
          </html>`);
          iframeDoc.close();
        }
      }
    }, 200);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="hover:text-emerald-600 text-emerald-500 cursor-pointer"
      >
        <Icon path={mdiPrinter} size={1} />
      </div>

      <iframe ref={iframeRef} title="Print Preview" className="hidden" />
    </>
  );
}
