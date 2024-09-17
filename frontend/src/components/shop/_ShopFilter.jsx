// Imports:
import React, { useEffect, useState } from 'react';

import { Button, RangeSlider, Slider } from '@mantine/core';
import { Checkbox, Label, Sidebar } from 'flowbite-react';

import classes from '../../styles/modules/rangeLable.module.css';
import { categories, subCategories } from '../../utils/config';

// Component:
export default function ShopFilter({ setMinMaxObj, setCategoriesArr, data }) {
  const [priceRange, setPriceRange] = useState([]);
  const [sizeRange, setSizeRange] = useState([]);

  const setCategoriesVal = (e) =>
    setCategoriesArr((prev) => {
      const cat = e.target.name;
      if (prev.includes(cat)) return prev.filter((ele) => ele !== cat);
      return [...prev, cat];
    });

  return (
    <Sidebar className="p-3 w-auto max-w-[250px]">
      <Sidebar.Items>
        <h3 className="text-right">קטגוריות</h3>
        <Sidebar.ItemGroup className="max-h-72 mb-4 overflow-y-scroll">
          {categories.map((category, i) => (
            <Sidebar.Item className="text-right" key={`category-${i}`}>
              <Label className="mr-2 font-bold">{category}</Label>
              <Checkbox
                name={category}
                onChange={setCategoriesVal}
                className="text-[#64b496]"
              />
              <div>
                {subCategories[i].map((subCategory, j) => (
                  <div className="mr-4 my-1 h-fit" key={`category-${i}-sub-${j}`}>
                    <Label className="mr-2">{subCategory}</Label>
                    <Checkbox
                      value={true}
                      name={subCategory}
                      onChange={setCategoriesVal}
                      className="text-[#64b496]"
                    />
                  </div>
                ))}
              </div>
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">מחיר</h3>
          <Sidebar.Item>
            <RangeSlider
              min={data.price[0]}
              max={data.price[1]}
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
              min={data.size[0]}
              max={data.size[1]}
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
