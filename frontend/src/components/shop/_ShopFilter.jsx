// Imports:
import React, { useState } from 'react';

import { Button, RangeSlider, Slider } from '@mantine/core';
import { Radio, Label, Sidebar } from 'flowbite-react';

import classes from '../../styles/modules/rangeLable.module.css';
import { categories, subCategories } from '../../utils/config';

// Component:
export default function ShopFilter({ setMinMaxObj, setCategory, data }) {
  const [priceRange, setPriceRange] = useState([]);
  const [sizeRange, setSizeRange] = useState([]);

  return (
    <Sidebar className="p-3 w-auto max-w-[250px]">
      <Sidebar.Items>
        <h3 className="text-right">קטגוריות</h3>
        <Sidebar.ItemGroup className="max-h-72 mb-4 overflow-y-scroll">
          {categories.map((category, i) => (
            <Sidebar.Item className="text-right" key={`category-${i}`}>
              <fieldset>
                <Label className="mr-2 font-bold">{category}</Label>
                <Radio
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-[#64b496]"
                />
                <div>
                  {subCategories[i].map((subCategory, j) => (
                    <div className="mr-4 my-1 h-fit" key={`category-${i}-sub-${j}`}>
                      <Label className="mr-2">{subCategory}</Label>
                      <Radio
                        value={subCategory}
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        className="text-[#64b496]"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">מחיר</h3>
          <Sidebar.Item>
            <RangeSlider
              min={data.prices.min}
              max={data.prices.max}
              step={10}
              labelAlwaysOn
              classNames={classes}
              color="#64b496"
              onChange={setPriceRange}
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">מידה</h3>
          <Sidebar.Item>
            <Slider
              labelAlwaysOn
              min={+data.sizes.min}
              max={+data.sizes.max}
              classNames={classes}
              color="#e8ecef"
              onChange={setSizeRange}
            />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
            <Button
              color="#64b496"
              className="mt-2 h-6 w-full"
              onClick={() => setMinMaxObj({ price: priceRange, size: sizeRange })}
            >
              סינון
            </Button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
