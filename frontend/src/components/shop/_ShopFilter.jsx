// Imports:
import React, { useState } from 'react';

import { Button, RangeSlider, Slider } from '@mantine/core';
import { Checkbox, Label, Sidebar } from 'flowbite-react';

import classes from '../../styles/modules/rangeLable.module.css';

// Component:
export default function ShopFilter() {
  const [filterObj, setFilterObj] = useState({});
  const [categories, setCategories] = useState([]);

  const setValueInFilter = (name) => (value) =>
    setFilterObj((prev) => ({ ...prev, [name]: value }));

  const setValueInCategory = ({ target: { name } }) =>
    setCategories((prev) =>
      prev.includes(name) ? prev.filter((ele) => ele !== name) : [...prev, name],
    );

  return (
    <Sidebar className="p-3 w-auto max-w-[250px]">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">קטגוריות</h3>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">כפכפים</Label>
            <Checkbox
              name="כפכפים"
              onChange={setValueInCategory}
              className="text-[#64b496]"
            />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">נעליים</Label>
            <Checkbox
              name="נעליים"
              onChange={setValueInCategory}
              className="text-[#64b496]"
            />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">מגפיים</Label>
            <Checkbox
              name="מגפיים"
              onChange={setValueInCategory}
              className="text-[#64b496]"
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">מחיר</h3>
          <Sidebar.Item>
            <RangeSlider
              min={300}
              max={500}
              step={20}
              labelAlwaysOn
              classNames={classes}
              color="#64b496"
              onChange={setValueInFilter('price')}
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">מידה</h3>
          <Sidebar.Item>
            <Slider
              labelAlwaysOn
              min={35}
              max={46}
              classNames={classes}
              color="#e8ecef"
              onChange={setValueInFilter('size')}
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
            <Button color="#64b496" className="mt-2 h-6 w-full">
              סינון
            </Button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
