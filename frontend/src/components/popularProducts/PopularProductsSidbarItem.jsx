import { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight } from 'react-icons/hi';
export default function PopularProductsSidbarItem({
  iconToShow,
  textToShow,
  setSelectedCategory,
}) {
  const btnContet = textToShow;
  const handleItemClick = () => {
    setSelectedCategory(btnContet);
  };

  return (
    <Sidebar.Item
      onClick={handleItemClick}
      href="#"
      icon={iconToShow}
      className="flex items-center justify-between w-full bg-gray-200  shadow-md rounded-lg my-2 p-2"
    >
      <div className="flex flex-nowrap items-center justify-between w-full">
        {textToShow}
        <HiArrowSmRight className="ml-2 text-gray-400" />
      </div>
    </Sidebar.Item>
  );
}
