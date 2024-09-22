import { Sidebar } from 'flowbite-react';
import PopularProductsSidbarItem from './PopularProductsSidbarItem';
import { BsTag } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { RiHeart2Line } from 'react-icons/ri';

export default function PopularProductsSidebar({ setSelectedCategory }) {
  return (
    /* Sidebar for screens >= md */
    <Sidebar className="hidden md:flex w-64 min-h-0 sticky top-0 bg-gray-100 rounded-md m-1 mb-6">
      <Sidebar.Items className="relative my-1 p-2">
        <Sidebar.ItemGroup className="my-0 py-0">
          <PopularProductsSidbarItem
            iconToShow={<FaRegStar className="text-emerald-500 mr-2" />}
            textToShow="דגמים נבחרים"
            setSelectedCategory={setSelectedCategory}
          />
          <PopularProductsSidbarItem
            iconToShow={<BsTag className="text-emerald-500 mr-2" />}
            textToShow="הנמכרים ביותר"
            setSelectedCategory={setSelectedCategory}
          />
          <PopularProductsSidbarItem
            iconToShow={<RiHeart2Line className="text-emerald-500 mr-2" />}
            textToShow="במיוחד בשבילך"
            setSelectedCategory={setSelectedCategory}
          />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
