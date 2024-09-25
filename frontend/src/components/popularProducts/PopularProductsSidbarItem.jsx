import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight } from 'react-icons/hi';
export default function PopularProductsSidbarItem({
  iconToShow,
  textToShow,
  setSelectedCategory,
  selectedCategory,

}) {
  const btnContet = textToShow;
  const handleItemClick = () => {
    setSelectedCategory(btnContet);
  };

  return (
    <Sidebar.Item
      onClick={handleItemClick}
      className={`text-emerald-500 flex items-center justify-between w-full ${selectedCategory===textToShow?'bg-gray-200 border border-emerald-300':' bg-gray-100'} hover:cursor-pointer shadow-md rounded-lg my-2 p-2`}
    >
      <div className="flex flex-nowrap items-center justify-between w-full">
        {iconToShow}
        {textToShow}
        <HiArrowSmRight className="ml-2 text-emerald-500" />
      </div>
    </Sidebar.Item>
  );
}
