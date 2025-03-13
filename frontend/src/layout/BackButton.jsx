import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Draggable from 'react-draggable';

const BackButton = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Draggable>
      <div
        className="fixed z-50 flex items-center justify-around p-3 text-green-500 bg-white border-2 border-green-300 rounded-full shadow-lg cursor-pointer top-1 left-1"
        onClick={goBack}
        draggable="true"
      >
        <FaArrowAltCircleLeft size={'2rem'} className="mr-2" /> חזרה
      </div>
    </Draggable>
  );
};
export default BackButton;
