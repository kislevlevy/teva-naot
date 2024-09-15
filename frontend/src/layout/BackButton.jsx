import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {FaArrowAltCircleLeft} from 'react-icons/fa'
import Draggable from 'react-draggable'; // The default
import notifyUser from '../components/notificationHandler/NotificationComp'

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const goBack = () => {
    if(location.state)
      navigate(-1); // Go back to the previous page
    console.log(location);
    notifyUser("going Back")    
  };

  return (
    <Draggable>
      <div
        className="fixed top-1 left-1 flex justify-around items-center cursor-pointer text-green-500 border-2 border-green-300 bg-white p-3 rounded-full shadow-lg z-50"
        onClick={goBack}
        draggable="true" 
      >
        <FaArrowAltCircleLeft size={"2rem"} className='mr-2'/> חזרה
      </div>
    </Draggable>
  );
}
export default BackButton;
