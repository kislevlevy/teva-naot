import { Button } from "flowbite-react";
import { BsTag, BsStarFill } from "react-icons/bs";
import { RiHeart2Line } from "react-icons/ri";

const PopularProductsButtonsGroup = ({ setSelectedCategory }) => {
  return (
    <div className="flex justify-around p-4 bg-gray-100">
      <Button 
        className="flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2" 
        onClick={() => setSelectedCategory("Popular Products")}
      >
        <BsStarFill className="mr-2" />
        Popular Products
      </Button>
      <Button 
        className="flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2" 
        onClick={() => setSelectedCategory("Special 4 U")}
      >
        <RiHeart2Line className="mr-2" />
        Special 4 U
      </Button>
      <Button 
        className="flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 shadow-md rounded-lg px-4 py-2 w-full mx-2" 
        onClick={() => setSelectedCategory("New Collection")}
      >
        <BsTag className="mr-2" />
        New Collection
      </Button>
    </div>
  );
};

export default PopularProductsButtonGroup;
