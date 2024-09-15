import React from 'react';
import { Table } from 'flowbite-react';
import CheckoutItem from './_CheckoutTableItem';

export default function CheckoutTable({ products }) {
  return (
    <Table
      hoverable
      className="bg-white"
      theme={{
        root: {
          base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 rounded-lg shadow-lg',
        },
        head: {
          cell: {
            base: 'bg-gray-50 px-6 py-3 dark:bg-gray-700 rounded-t-lg',
          },
        },
      }}
    >
      <Table.Head>
        <Table.HeadCell className="text-center">פריט</Table.HeadCell>
        <Table.HeadCell className="text-center">שם</Table.HeadCell>
        <Table.HeadCell className="text-center">מידע</Table.HeadCell>
        <Table.HeadCell className="text-center">מחיר</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {products.map((product) => (
          <CheckoutItem key={product.id} product={product} />
        ))}
      </Table.Body>
    </Table>
  );
}
