import { useEffect, useState } from 'react';

import { Button, TextInput, Table, Card, Select } from 'flowbite-react';
import Icon from '@mdi/react';
import {
  mdiArrowBottomRight,
  mdiArrowTopRight,
  mdiCurrencyIls,
  mdiMagnify,
  mdiOpenInNew,
  mdiPlus,
  mdiTrashCanOutline,
} from '@mdi/js';

import { toMoneyString } from '../../utils/helperFunctions';
import {
  useDeleteProductByIdMutation,
  useGetProductsQuery,
} from '../../slices/api/apiProductsSlices';
import ProductEditor from './subComponents/_ProductEditor';
import ConfirmationModal from '../helpers/ConfermationModal';
import { useGetProfitsQuery } from '../../slices/api/apiStatsSlices';

export default function ProductDashboard() {
  const [filterStr, setFilterStr] = useState('');
  const [searchOption, setSearchOption] = useState('_id');
  const [query, setQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const { data: statsData, isSuccess: isStats } = useGetProfitsQuery();
  const [stats, setStats] = useState(null);

  const { data, isSuccess } = useGetProductsQuery(
    `?fields=sold,name,price,ratingsAvg,image,category${filterStr || ''}`
  );
  const [products, setProducts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    setFilterStr(`&${searchOption}=${query}`);
  };

  useEffect(() => {
    if (isSuccess) setProducts(data.data.docs);
    if (isStats) setStats(statsData.data.profitData);
  }, [data, isStats]);

  return (
    <div className="w-full">
      {stats && (
        <div className="flex justify-center p-2 m-2 space-x-3 overflow-x-scroll">
          <StatsCard
            {...{ lable: 'חודשי', main: stats.month[0], diff: stats.month[1] }}
          />
          <StatsCard
            {...{ lable: 'שבועי', main: stats.week[0], diff: stats.week[1] }}
          />
          <StatsCard
            {...{ lable: 'יומי', main: stats.day[0], diff: stats.day[1] }}
          />
        </div>
      )}
      {selectedProductId && (
        <ProductEditor {...{ setSelectedProductId, selectedProductId }} />
      )}

      <div className="container p-4 mx-auto">
        <form
          dir="rtl"
          onSubmit={handleSubmit}
          className="flex items-center justify-between p-2 mb-2 rounded-lg bg-gray-50"
        >
          <div className="flex gap-x-1">
            <TextInput
              type="text"
              placeholder={`חפש לפי ${searchOption === '_id' ? 'מק"ט' : 'שם'}...`}
              className="rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={() => (
                <Icon className="text-gray-400" path={mdiMagnify} size={0.7} />
              )}
            />
            <Select
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              className="w-20 rounded"
            >
              <option value="_id">{'מק"ט'}</option>
              <option value="q">שם</option>
            </Select>
          </div>
          <Button color="gray" onClick={() => setFilterStr('')}>
            אפס חיפוש
          </Button>
          <input type="submit" hidden />
        </form>
        {isSuccess && (
          <Table hoverable dir="rtl">
            <Table.Head className="text-center">
              <Table.HeadCell>תמונה</Table.HeadCell>
              <Table.HeadCell>שם</Table.HeadCell>
              <Table.HeadCell>מחיר</Table.HeadCell>
              <Table.HeadCell>קטגוריות</Table.HeadCell>
              <Table.HeadCell>דירוג ממוצע</Table.HeadCell>
              <Table.HeadCell>נמכרו</Table.HeadCell>
              <Table.HeadCell>
                <Button
                  size="xs"
                  color="success"
                  onClick={() => setSelectedProductId('new')}
                >
                  <Icon path={mdiPlus} size={0.6} />
                </Button>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product, i) => (
                <TableEntry
                  {...{ product, setSelectedProductId }}
                  key={'product-row-' + i}
                />
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}

function StatsCard({ lable, main, diff }) {
  const percent = Math.abs(((main - diff) / diff) * 100);
  const isPositive = main - diff > 0;

  return (
    <Card className="min-w-52 w-fit bg-gray-50">
      <div className="flex items-center justify-between font-bold text-gray-400">
        <Icon path={mdiCurrencyIls} size={0.6} />
        <h5 className="">{lable}</h5>
      </div>
      <div className="flex items-end">
        <h2 className="mr-3 text-3xl font-bold">{toMoneyString(main)}</h2>
        {!!percent && (
          <div
            className={`flex h-fit items-center ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            <h3 className="translate-y-[1px]">{Math.trunc(percent)}%</h3>
            {isPositive ? (
              <Icon path={mdiArrowTopRight} size={0.6} />
            ) : (
              <Icon path={mdiArrowBottomRight} size={0.6} />
            )}
          </div>
        )}
      </div>
      {!!percent && (
        <p className="text-xs text-right text-gray-500 rtl">
          בהשוואה לתקופת זמן קודמת
        </p>
      )}
    </Card>
  );
}

function TableEntry({ product, setSelectedProductId }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [deleteProductById] = useDeleteProductByIdMutation();

  useEffect(() => {
    if (isConfirmed) {
      deleteProductById(product._id);
      setIsConfirmOpen(false);
    }
  }, [isConfirmed]);

  return (
    <Table.Row className="text-center">
      <ConfirmationModal
        {...{
          isConfirmOpen,
          setIsConfirmOpen,
          message:
            'בלחיצה על אישור תמחק את המוצר הנבחר לצמיתות, פעולה זאת לא ניתנת להפיכה. האם תרצה להמשיך?',
          setIsConfirmed,
        }}
      />
      <Table.Cell>
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-20 h-20 rounded-lg"
        />
      </Table.Cell>
      <Table.Cell>{product.name}</Table.Cell>
      <Table.Cell dir="ltr">{toMoneyString(product.price)}</Table.Cell>
      <Table.Cell>{product.category.join(', ')}</Table.Cell>
      <Table.Cell>{product.ratingsAvg}/10</Table.Cell>
      <Table.Cell>{product.sold}</Table.Cell>
      <Table.Cell>
        <div className="space-y-2">
          <Button
            size="xs"
            color="success"
            onClick={() => setSelectedProductId(product._id)}
          >
            <Icon path={mdiOpenInNew} size={0.7} />
          </Button>
          <Button size="xs" color="failure" onClick={() => setIsConfirmOpen(true)}>
            <Icon path={mdiTrashCanOutline} size={0.7} />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
