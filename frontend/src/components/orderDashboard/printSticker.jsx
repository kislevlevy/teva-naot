import React, { useState, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiPrinter } from '@mdi/js';
import 'flowbite'; // Make sure Flowbite is imported

const OrderConfirmation = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);

    // Dynamically insert the sticker content into the iframe
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
                body { font-family: Arial, sans-serif; padding: 20px; }
                .sticker { padding: 20px; border: 1px solid black; max-width: 600px; margin: auto; }
                .header, .footer { display: flex; justify-content: space-between; margin-bottom: 20px; }
                ul { list-style-type: disc; margin-left: 20px; }
              </style>
            </head>
            <body>
              <div class="sticker">
                <div class="header">
                  <div>
                    <p><strong>Shipping to:</strong> ${order.customerName}</p>
                    <p>Email: ${order.email}</p>
                    <p>Phone: ${order.phone}</p>
                  </div>
                  <div>
                    <img src="https://res.cloudinary.com/drxtaxnkr/image/upload/v1725452130/logoMain_bz64nt.svg" alt="Company Logo" style="width: 100px;" />
                  </div>
                </div>

                <hr />

                <div>
                  <p><strong>Shipping Address:</strong></p>
                  <p>${order.shippingAddress.street}</p>
                  <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}</p>
                  <p>${order.shippingAddress.country}</p>
                </div>

                <hr />

                <div>
                  <h4>Products:</h4>
                  <ul>
                    ${order.items
                      .map(
                        (item) => `
                      <li>
                        <strong>${item.name}</strong> - 
                        Size: ${item.size}, 
                        Price: $${item.price}, 
                        Quantity: ${item.quantity}
                      </li>
                    `,
                      )
                      .join('')}
                  </ul>
                </div>

                <hr />

                <div class="footer">
                  <div><p><strong>Order No:</strong> ${order.id}</p></div>
                  <div><p><strong>Date of Order:</strong> ${order.orderDate}</p></div>
                  <div><p><strong>Total Price:</strong> $${order.totalPrice}</p></div>
                </div>
              </div>

              <script>
                window.onload = function() {
                  window.print();
                  window.onafterprint = window.close(); // Close the iframe after printing
                };
              </script>
            </body>
            </html>
          `);
          iframeDoc.close(); // Close the document after writing
        } else {
          console.error('Unable to access iframe document');
        }
      }
    }, 200); // Delay for modal animation to fully open
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Button to open the print dialog directly */}
      <div
        onClick={openModal}
        className="hover:text-emerald-700 text-emerald-500 cursor-pointer"
      >
        <Icon path={mdiPrinter} size={5} />
      </div>

      {/* Hidden iframe */}
      <iframe
        ref={iframeRef}
        title="Print Preview"
        className="hidden" // Ensure the iframe is not visible on the page
        frameBorder="0"
      />
    </div>
  );
};

export default OrderConfirmation;
