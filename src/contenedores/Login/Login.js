import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import store from "../../store/store.js";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, USER_LOGGED, VER_POPUP } from "../../store/types";

const Login = () => {
  const navegar = useNavigate();
  const dispatch = useDispatch();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      let loginUser = await fetch(
        "https://clone-netflix-back.herokuapp.com/usuarios/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: e.target[0].value,
            password: e.target[1].value,
          },
        }
      );
      loginUser = await loginUser.json();

      if (loginUser) {
        localStorage.setItem("token", loginUser.ficha);
        localStorage.setItem("id", loginUser.id);
        localStorage.setItem("rol", loginUser.rol);
        if (localStorage.getItem("rol") === "admin") {
          dispatch(actionCreator(USER_LOGGED));
          dispatch(
            actionCreator(VER_POPUP, "Te has logeado correctamente. Bienvenido")
          );
          setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
          navegar("/alquileresadmin");
        } else {
          dispatch(actionCreator(USER_LOGGED));
          dispatch(
            actionCreator(VER_POPUP, "Te has logeado correctamente. Bienvenido")
          );
          setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
          navegar("/areaCliente");
        }
      } else {
        alert("Usuario y/o contraseña incorrecto.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      class="d-flex align-items-center justify-content-center"
      className="fondo contenedor"
    >
      <div class="col-lg-12">
        <h2 class="mb-5">LOGIN DE USUARIO</h2>
        <form onSubmit={(e) => formSubmit(e)} className="formUsuario">
          <div class="row justify-content-center mt-2">
            <label class="col-lg-1 text-start" htmlFor="email">
              Email:
            </label>
            <input class="col-lg-1" type="email" id="email" name="email" />
          </div>
          <div class="row justify-content-center mt-2">
            <label class="col-lg-1 text-start" htmlFor="contraseña">
              Contraseña:
            </label>
            <input
              class="col-lg-1"
              type="password"
              id="contraseña"
              name="contraseña"
            />
          </div>
          <div class="row justify-content-center mt-4 mb-1">
            <input type="submit" value="Entrar" class="col-lg-1 btn btn-dark" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
