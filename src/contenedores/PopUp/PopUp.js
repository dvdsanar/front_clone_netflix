import { useDispatch, useSelector } from "react-redux";
import "./PopUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PopUp = () => {
  const popupState = useSelector((state) => state.popup);

  return (
    <div>
      {popupState.visibilidad && (
        <div class="popup">
          <p>{popupState.texto}</p>
        </div>
      )}
    </div>
  );
};

export default PopUp;
