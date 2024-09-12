// Imports:
import React, { useEffect, useState } from 'react';

import { Button, RangeSlider, Slider } from '@mantine/core';
import { Checkbox, Label, Sidebar } from 'flowbite-react';

import classes from '../../styles/modules/rangeLable.module.css';
import { useGetProductsGroupByFilterQuery } from '../../slices/api/apiProductsGroupSlices';
// Component:
export default function ShopFilter() {
  const [filterObj, setFilterObj] = useState({price:[400,500],size:40});
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
   const {data,isError} = useGetProductsGroupByFilterQuery(filter)
// console.log(isError,data)
// price[gt]=400&price[lt]=500
  const setValueInFilter = (name) => (value) =>
    setFilterObj((prev) => ({ ...prev, [name]: value }));
  
  const setValueInCategory = ({ target: { name } }) =>
    setCategories((prev) =>
      prev.includes(name) ? prev.filter((ele) => ele !== name) : [...prev, name]    
    );
  
  const handleFilter = ()=>{
      console.log(categories)
      if(categories.length===0){
        setFilter((prev) => {
    prev = `?category=נעליים${`&price[gt]=${filterObj.price[0] + `&price[lt]=${filterObj.price[1]}` + `&size=${filterObj.size}`}`}`;
        return prev;
        });    
      }else{
        setFilter((prev) => {
      prev = `?category=${categories.join(',') + `&price[gt]=${filterObj.price[0] + `&price[lt]=${filterObj.price[1]}`+`&size=${filterObj.size}`}`}`;
          return prev;
        }); 
      }
  }

  useEffect(() => {
    setFilter((prev) => {
    prev = `?category=נעליים${`&price[gt]=${filterObj.price[0] + `&price[lt]=${filterObj.price[1]}`+ `&size=${filterObj.size}`}`}`;
      return prev;
    });
  }, []);

// console.log(categories)
  return (
    <Sidebar className="p-3 w-auto max-w-[250px]">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="mb-4">
          <h3 className="text-right">קטגוריות</h3>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">כפכפים</Label>
            <Checkbox
              name="כפכפים"
              // name="sandals"
              onChange={setValueInCategory}
              className="text-[#64b496]"
            />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">נעליים</Label>
            <Checkbox
              name="נעליים"
              // name="shooe"
              onChange={setValueInCategory}
              className="text-[#64b496]"
            />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">מגפיים</Label>
            <Checkbox
              name="מגפיים"
              // name="boots"
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
            <Button onClick={handleFilter} color="#64b496" className="mt-2 h-6 w-full">
              סינון
            </Button>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
