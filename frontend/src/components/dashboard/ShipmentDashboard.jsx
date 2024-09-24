import React, { useEffect, useState } from 'react';

import { Button, TextInput, Table, Card, Popover, Select } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiSync, mdiTruck } from '@mdi/js';
import { toDateString } from '../../utils/helperFunctions';
import {
  useChangeOrderStatusByIdMutation,
  useGetOrdersQuery,
} from '../../slices/api/apiOrdersSlices';
import PrintSticker from './subComponents/_PrintSticker';

export default function ShipmentDashboard() {
  const [filterStr, setFilterStr] = useState('');
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);

  const { data, isSuccess } = useGetOrdersQuery(
    filterStr || '?limit=10&status=procceing',
  );

  const handleQuery = (e) => {
    e.preventDefault();
    setFilterStr(`?_id=${query}`);
  };

  useEffect(() => {
    if (isSuccess) setOrders(data.data.docs);
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex space-x-3 p-2 m-2 overflow-x-scroll justify-center">
        <StatsCard {...{ lable: 'בדרך ללקוח', main: 59 }} />
        <StatsCard {...{ lable: 'מוכן לשילוח', main: 26 }} />
        <StatsCard {...{ lable: 'ממתין לתשלום', main: 5 }} />
      </div>

      <div className="container mx-auto p-4">
        <form
          onSubmit={handleQuery}
          className="mb-2 p-2 flex justify-between bg-gray-50 rounded-lg"
        >
          <Button color="gray" onClick={() => setFilterStr('')}>
            אפס חיפוש
          </Button>
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder={'חפש לפי מספר הזמנה...'}
            className="rounded rtl"
            icon={() => (
              <Icon className="text-gray-400" path={mdiMagnify} size={0.7} />
            )}
          />
          <input type="submit" hidden />
        </form>
        <Table hoverable dir="rtl">
          <Table.Head className="text-center">
            <Table.HeadCell>מספר הזמנה</Table.HeadCell>
            <Table.HeadCell>סטאטוס</Table.HeadCell>
            <Table.HeadCell>תאריך הזמנה</Table.HeadCell>
            <Table.HeadCell>עיר</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders &&
              orders.map((order, i) => (
                <TableEntry key={'order-' + i} {...{ order }} />
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

function StatsCard({ lable, main }) {
  return (
    <Card className="min-w-52 w-fit bg-gray-50">
      <div className="flex justify-between items-center font-bold text-gray-400">
        <Icon path={mdiTruck} size={0.6} />
        <h5 className="">{lable}</h5>
      </div>
      <div className="flex items-end">
        <h2 className="text-3xl w-full text-center font-bold mr-3">{main}</h2>
      </div>
    </Card>
  );
}

function TableEntry({ order }) {
  const [status, setStatus] = useState(
    ['pending', 'canceled'].includes(order.status) ? 'procceing' : order.status,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [changeOrderStatusById] = useChangeOrderStatusByIdMutation();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (
        !status ||
        ['pending', 'canceled'].includes(status) ||
        status === order.status
      )
        throw new Error('order stus is unchanged or not valid.');

      await changeOrderStatusById({ id: order._id, body: { status } });
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
    }
  };

  return (
    <Table.Row className="text-center">
      <Table.Cell>{order._id}</Table.Cell>
      <Table.Cell>{order.status}</Table.Cell>
      <Table.Cell>{toDateString(order.orderDate)}</Table.Cell>
      <Table.Cell>{order.shippingAddress.city}</Table.Cell>
      <Table.Cell>
        <div className="space-y-1 flex flex-col items-center justify-center">
          <Popover
            content={
              <div className="flex flex-col p-5 space-y-2">
                <Select
                  className="w-28 eng-font"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="procceing">procceing</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                </Select>
                <Button
                  color="success"
                  isProcessing={isLoading}
                  onClick={handleSubmit}
                >
                  שמור
                </Button>
              </div>
            }
          >
            <div className="hover:text-emerald-600 text-emerald-500 cursor-pointer">
              <Icon path={mdiSync} size={1} />
            </div>
          </Popover>

          <PrintSticker {...{ order }} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
