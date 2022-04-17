import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";
import "./Registro.css";

const Registro = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const formSubmit = async (e) => {
    // Make the submit dont refresh the page
    e.preventDefault();
    try {
      const formData = {
        nombre: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      const postUser = await fetch(
        "https://clone-netflix-back.herokuapp.com/usuarios",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const usuarioCreado = await postUser.json();

      if (usuarioCreado) {
        dispatch(actionCreator(VER_POPUP, "Usuario creado. Bienvenido"));
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
        navegar("/login");
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };

  return (
    <div class="d-flex align-items-center justify-content-center fondo contenedor">
      <div class="col-lg-12">
        <h2 class="mb-5">REGISTRO DE USUARIO</h2>
        <form onSubmit={(e) => formSubmit(e)}>
          <div class="row justify-content-center mt-2">
            <label class="col-lg-2 text-start" htmlFor="nombre">
              Nombre:
            </label>
            <input class="col-lg-2" type="text" id="nombre" name="nombre" />
          </div>
          <div class="row justify-content-center mt-2">
            <label class="col-lg-2 text-start" htmlFor="email">
              Email:
            </label>
            <input
              class="col-lg-2"
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@dominio.com"
            />
          </div>
          <div class="row justify-content-center mt-2">
            <label class="col-lg-2 text-start" htmlFor="contraseña">
              Contraseña:
            </label>
            <input
              class="col-lg-2"
              type="password"
              id="contraseña"
              name="contraseña"
            />
          </div>
          <div class="row justify-content-center mt-4 mb-1">
            <input
              class="col-lg-1 btn btn-dark rounded-pill"
              type="submit"
              value="Registrarse"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
