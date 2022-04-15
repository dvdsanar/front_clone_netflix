import { useDispatch, useSelector } from "react-redux";
import "./PopUp.css";

const PopUp = () => {
  const popupState = useSelector((state) => state.popup);

  return (
    <div>
      {popupState.visibilidad && (
        <div className="popup">
          <p>{popupState.texto}</p>
        </div>
      )}
    </div>
  );
};

export default PopUp;
