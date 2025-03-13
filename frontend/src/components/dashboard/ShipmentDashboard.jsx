import { useEffect, useState } from 'react';

import { Button, TextInput, Table, Card, Popover, Select } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiSync, mdiTruck } from '@mdi/js';
import { toDateString } from '../../utils/helperFunctions';
import {
  useChangeOrderStatusByIdMutation,
  useGetOrdersQuery,
} from '../../slices/api/apiOrdersSlices';
import PrintSticker from './subComponents/_PrintSticker';
import { useGetOrdersLeftQuery } from '../../slices/api/apiStatsSlices';

export default function ShipmentDashboard() {
  const [filterStr, setFilterStr] = useState('');
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState(null);
  const { data: statsDb, isSuccess: isStats } = useGetOrdersLeftQuery();

  const { data, isSuccess } = useGetOrdersQuery(
    filterStr || '?limit=10&status=procceing'
  );

  const handleQuery = (e) => {
    e.preventDefault();
    setFilterStr(`?_id=${query}`);
  };

  useEffect(() => {
    if (isSuccess) setOrders(data.data.docs);
    if (isStats) setStats(statsDb.data);
  }, [data, isStats]);

  return (
    <div className="w-full">
      {stats && (
        <div className="flex justify-center p-2 m-2 space-x-3 overflow-x-scroll">
          <StatsCard {...{ lable: 'בדרך ללקוח', main: stats.shipped }} />
          <StatsCard {...{ lable: 'מוכן לשילוח', main: stats.processing }} />
          <StatsCard {...{ lable: 'ממתין לתשלום', main: stats.pending }} />
        </div>
      )}

      <div className="container p-4 mx-auto">
        <form
          onSubmit={handleQuery}
          className="flex justify-between p-2 mb-2 rounded-lg bg-gray-50"
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
      <div className="flex items-center justify-between font-bold text-gray-400">
        <Icon path={mdiTruck} size={0.6} />
        <h5 className="">{lable}</h5>
      </div>
      <div className="flex items-end">
        <h2 className="w-full mr-3 text-3xl font-bold text-center">{main}</h2>
      </div>
    </Card>
  );
}

function TableEntry({ order }) {
  const [status, setStatus] = useState(
    ['pending', 'canceled'].includes(order.status) ? 'procceing' : order.status
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
        <div className="flex flex-col items-center justify-center space-y-1">
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
            <div className="cursor-pointer hover:text-emerald-600 text-emerald-500">
              <Icon path={mdiSync} size={1} />
            </div>
          </Popover>

          <PrintSticker {...{ order }} />
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
