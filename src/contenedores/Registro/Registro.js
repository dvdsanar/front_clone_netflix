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
    <div className="crearUsuario">
      <h2 className="h2registro">REGISTRO DE USUARIO</h2>
      <form onSubmit={(e) => formSubmit(e)} className="formCrearUsuario">
        <label className="labelCrearUsuario" htmlFor="nombre">
          Nombre
        </label>
        <input
          className="inputCrearUsuario"
          type="text"
          id="nombre"
          name="nombre"
        />
        <label className="labelCrearUsuario" htmlFor="email">
          Email
        </label>
        <input
          className="inputCrearUsuario"
          type="email"
          id="email"
          name="email"
          placeholder="ejemplo@dominio.com"
        />
        <label className="labelCrearUsuario" htmlFor="contraseña">
          Contraseña
        </label>
        <input
          className="inputCrearUsuario"
          type="password"
          id="contraseña"
          name="contraseña"
        />
        <input
          className="botonCrearUsuario"
          type="submit"
          value="Registrarse"
        />
      </form>
    </div>
  );
};

export default Registro;
