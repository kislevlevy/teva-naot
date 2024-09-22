import React from 'react';

import { Button, TextInput, Table, Card, Pagination } from 'flowbite-react';
import Icon from '@mdi/react';
import {
  mdiArrowBottomRight,
  mdiArrowTopRight,
  mdiCurrencyIls,
  mdiMagnify,
  mdiTruck,
} from '@mdi/js';
import { toDateString, toMoneyString } from '../../utils/helperFunctions';

export default function ShipmentDashboard() {
  return (
    <div className="w-full">
      <div className="flex space-x-3 p-2 m-2 overflow-x-scroll justify-center">
        <StatsCard {...{ lable: 'בדרך ללקוח', main: 59 }} />
        <StatsCard {...{ lable: 'מוכן לשילוח', main: 26 }} />
        <StatsCard {...{ lable: 'ממתין לתשלום', main: 5 }} />
      </div>

      <div className="container mx-auto p-4">
        <form
          onSubmit={() => {}}
          className="mb-2 p-2 flex justify-end bg-gray-50 rounded-lg"
        >
          <TextInput
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
            <Table.HeadCell>כתובת</Table.HeadCell>
            <Table.HeadCell>פעולות</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {/* Example row */}
            <Table.Row className="text-center">
              <Table.Cell>18616486161</Table.Cell>
              <Table.Cell>pending</Table.Cell>
              <Table.Cell>{toDateString(Date.now())}</Table.Cell>
              <Table.Cell>צפצפה 5, להב, 8533500</Table.Cell>
              <Table.Cell>
                <div className="space-y-2 flex flex-col items-center justify-center">
                  <Button className="w-32" size="xs" color="warning">
                    שנה סטאטוס הזמנה
                  </Button>
                  <Button className="w-32" size="xs" color="success">
                    הדפס מדבקה
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
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
