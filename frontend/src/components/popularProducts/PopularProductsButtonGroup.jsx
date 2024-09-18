import { Button } from 'flowbite-react';
import { BsTag } from 'react-icons/bs';
import { FaRegStar } from "react-icons/fa";
import { RiHeart2Line } from 'react-icons/ri';

export default function PopularProductsButtonsGroup({ setSelectedCategory }) {
  return (
    <div className="flex justify-around p-4 bg-gray-100">
      <Button
        className="flex items-center justify-center bg-white text-emerald-500 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2 rtl"
        onClick={() => setSelectedCategory('דגמים נבחרים')}
      >
        <FaRegStar size={"1.5rem"} className="self-center ml-2" />
        דגמים נבחרים
      </Button>
      <Button
        className="flex items-center justify-center bg-white text-emerald-500 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2 rtl"
        onClick={() => setSelectedCategory('New Collection')}
      >
        <BsTag size={"1.5rem"} className="self-center ml-2" />
        הנמכרים ביותר
      </Button> 
      <Button
        className="flex items-center justify-center bg-white text-emerald-500 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2 rtl"
        onClick={() => setSelectedCategory('Special 4 U')}
      >
        <RiHeart2Line size={"1.5rem"} className="self-center ml-2" />
        במיוחד בשבילך
      </Button>
 
    </div>
  );
}
