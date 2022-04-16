import { Link } from "react-router-dom";
import "./Header.css";
import store from "../../store/store.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../store/types";
import actionCreator from "../../store/actionTypes";

const Header = () => {
  const navegar = useNavigate();
  const dispatch = useDispatch();
  const [logged, setlogged] = useState(store.getState().logged);

  useEffect(() => {
    store.subscribe(() => {
      setlogged(store.getState().logged);
    });
  }, []);

  return (
    <header>
      {logged && (
        <div>
          <div className="enlaces">
            <a
              onClick={() => {
                dispatch(actionCreator(USER_LOGOUT));
                navegar("/login");
              }}
            >
              Logout
            </a>
          </div>
          <div className="enlaces">
            <Link to="/listapeliculas">Películas</Link>
          </div>
          <div className="enlaces">
            <Link to="/areaCliente">Perfil</Link>
          </div>
          <div className="enlaces">
            <Link to="/">Home</Link>
          </div>
        </div>
      )}
      {!logged && (
        <div>
          <div className="enlaces">
            <Link to="/registro">Registrarse</Link>
          </div>
          <div className="enlaces">
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
