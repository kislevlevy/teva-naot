import React, { useEffect, useState } from 'react';

import { Button, TextInput, Table, Card, Select } from 'flowbite-react';
import Icon from '@mdi/react';
import {
  mdiArrowBottomRight,
  mdiArrowTopRight,
  mdiCurrencyIls,
  mdiMagnify,
} from '@mdi/js';

import { toMoneyString } from '../../utils/helperFunctions';
import { useGetProductsQuery } from '../../slices/api/apiProductsSlices';
import ProductEditor from './subComponents/_ProductEditor';

export default function ProductDashboard() {
  const [filterStr, setFilterStr] = useState('');
  const [searchOption, setSearchOption] = useState('_id');
  const [query, setQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const { data, isSuccess } = useGetProductsQuery(
    `?fields=sold,name,price,ratingsAvg,image,category${filterStr || ''}`,
  );
  const [products, setProducts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    setFilterStr(`&${searchOption}=${query}`);
  };

  useEffect(() => {
    if (isSuccess) setProducts(data.data.docs);
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex space-x-3 p-2 m-2 overflow-x-scroll justify-center">
        <StatsCard {...{ lable: 'חודשי', main: 13456, diff: 34 }} />
        <StatsCard {...{ lable: 'שבועי', main: 1943, diff: -10 }} />
        <StatsCard {...{ lable: 'יומי', main: 1236, diff: 52 }} />
      </div>
      {selectedProductId && (
        <ProductEditor {...{ setSelectedProductId, selectedProductId }} />
      )}

      <div className="container mx-auto p-4">
        <div className="mb-2 p-2 flex justify-between items-center bg-gray-50 rounded-lg">
          <Button
            size="xs"
            color="success"
            onClick={() => setSelectedProductId('new')}
          >
            צור מוצר חדש
          </Button>
          <form dir="rtl" onSubmit={handleSubmit} className="flex gap-x-1">
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
              className="rounded w-20"
            >
              <option value="_id">{'מק"ט'}</option>
              <option value="q">שם</option>
            </Select>
            <input type="submit" hidden />
          </form>
        </div>
        {isSuccess && (
          <Table hoverable dir="rtl">
            <Table.Head className="text-center">
              <Table.HeadCell>תמונה</Table.HeadCell>
              <Table.HeadCell>שם</Table.HeadCell>
              <Table.HeadCell>מחיר</Table.HeadCell>
              <Table.HeadCell>קטגוריות</Table.HeadCell>
              <Table.HeadCell>דירוג ממוצע</Table.HeadCell>
              <Table.HeadCell>נמכרו</Table.HeadCell>
              <Table.HeadCell>פעולות</Table.HeadCell>
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
  return (
    <Card className="min-w-52 w-fit bg-gray-50">
      <div className="flex justify-between items-center font-bold text-gray-400">
        <Icon path={mdiCurrencyIls} size={0.6} />
        <h5 className="">{lable}</h5>
      </div>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold mr-3">{toMoneyString(main)}</h2>
        <div
          className={`flex h-fit items-center ${diff > 0 ? 'text-green-400' : 'text-red-400'}`}
        >
          <h3 className="translate-y-[1px]">{diff}%</h3>
          {diff > 0 ? (
            <Icon path={mdiArrowTopRight} size={0.6} />
          ) : (
            <Icon path={mdiArrowBottomRight} size={0.6} />
          )}
        </div>
      </div>
      <p className="text-xs text-right rtl text-gray-500">
        בהשוואה לתקופת זמן קודמת
      </p>
    </Card>
  );
}

function TableEntry({ product, setSelectedProductId }) {
  return (
    <Table.Row className="text-center">
      <Table.Cell>
        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 object-cover rounded-lg"
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
            פתח
          </Button>
          <Button size="xs" color="failure" onClick={() => 'TODO:'}>
            מחק
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
