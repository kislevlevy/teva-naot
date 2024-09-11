import { Sidebar } from 'flowbite-react';
import PopularProductsSidbarItem from './PopularProductsSidbarItem';
import { BsTag, BsStarFill } from 'react-icons/bs';
import { RiHeart2Line } from 'react-icons/ri';

export default function PopularProductsSidebar({ setSelectedCategory }) {
  return (
    /* Sidebar for screens >= md */
    <Sidebar className="hidden md:flex w-64 min-h-0 sticky top-0 bg-gray-100 rounded-md m-1 mb-6">
      <Sidebar.Items className="relative my-1 p-2">
        <Sidebar.ItemGroup className="my-0 py-0">
          <PopularProductsSidbarItem
            iconToShow={BsStarFill}
            textToShow="Popular Products"
            setSelectedCategory={setSelectedCategory}
          />
          <PopularProductsSidbarItem
            iconToShow={RiHeart2Line}
            textToShow="Special 4 U"
            setSelectedCategory={setSelectedCategory}
          />
          <PopularProductsSidbarItem
            iconToShow={BsTag}
            textToShow="New Collection"
            setSelectedCategory={setSelectedCategory}
          />
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
