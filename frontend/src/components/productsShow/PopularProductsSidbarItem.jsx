import { Sidebar } from "flowbite-react";
import { HiArrowSmRight } from "react-icons/hi";

const PopularProductsSidbarItem = ({iconToShow, textToShow, setSelectedCategory}) => {
    const handleItemClick = (e)=>{
        console.log(e.target.text);
        
        setSelectedCategory(e.target.text)
    }

    return (
        <Sidebar.Item onClick={handleItemClick} href="#" icon={iconToShow} className="flex items-center justify-between w-full bg-gray-200  shadow-md rounded-lg my-2 p-2">
            <div className="flex flex-nowrap items-center justify-between w-full">
                {textToShow}
                <HiArrowSmRight className="ml-2 text-gray-400" />
            </div>
        </Sidebar.Item>
  )
}

export default PopularProductsSidbarItem