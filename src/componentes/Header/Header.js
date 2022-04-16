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
        <div class="row">
          <div class="col-md">
            <a
              class="btn btn-dark"
              onClick={() => {
                dispatch(actionCreator(USER_LOGOUT));
                navegar("/login");
              }}
            >
              Logout
            </a>
          </div>
          <div class="col-md">
            <Link class="btn btn-dark" to="/listapeliculas">
              Películas
            </Link>
          </div>
          <div class="col-md">
            <Link class="btn btn-dark" to="/areaCliente">
              Perfil
            </Link>
          </div>
          <div class="col-md">
            <Link class="btn btn-dark" to="/">
              Home
            </Link>
          </div>
        </div>
      )}
      {!logged && (
        <div class="row">
          <div class="col-sm-6">
            <Link class="btn btn-dark" to="/registro">
              Registrarse
            </Link>
          </div>
          <div class="col-sm-6">
            <Link class="btn btn-dark" to="/login">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
