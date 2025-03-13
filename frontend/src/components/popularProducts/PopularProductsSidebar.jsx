import { Sidebar } from 'flowbite-react';
import PopularProductsSidbarItem from './PopularProductsSidbarItem';
import { BsTag } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { RiHeart2Line } from 'react-icons/ri';

export default function PopularProductsSidebar({
  setSelectedCategory,
  selectedCategory,
}) {
  return (
    /* Sidebar for screens >= md */
    <Sidebar className="sticky top-0 hidden w-64 min-h-0 m-1 mb-6 bg-gray-100 rounded-md md:flex">
      <Sidebar.Items className="relative p-2 my-1">
        <Sidebar.ItemGroup className="py-0 my-0">
          <PopularProductsSidbarItem
            iconToShow={<FaRegStar className="mr-2 text-emerald-500" />}
            textToShow="הצג הכל"
            {...{ selectedCategory, setSelectedCategory, name: 'all' }}
          />
          <PopularProductsSidbarItem
            iconToShow={<BsTag className="mr-2 text-emerald-500" />}
            textToShow="מוצרים פופולריים"
            {...{ selectedCategory, setSelectedCategory, name: 'popular' }}
          />
          <PopularProductsSidbarItem
            iconToShow={<RiHeart2Line className="mr-2 text-emerald-500" />}
            textToShow="מוצרים נבחרים"
            {...{ selectedCategory, setSelectedCategory, name: 'selected' }}
          />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
