import "./ModificarUsuario.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const ModificarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const navegar = useNavigate();

  const getUsuario = async () => {
    const usuarioRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/usuarios/" +
        localStorage.getItem("id"),
      {
        method: "GET",
      }
    );
    const datosUsuario = await usuarioRes.json();
    setUsuarios(datosUsuario[0]);
  };
  useEffect(() => {
    try {
      getUsuario();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        nombre: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      };

      const patchUsuario = await fetch(
        "https://clone-netflix-back.herokuapp.com/usuarios/" + params.id,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (patchUsuario) {
        dispatch(actionCreator(VER_POPUP, "Has modificado a tus datos"));
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
        setTimeout(() => navegar("/areaCliente"), 4000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div className="modificarUsuario">
      <h1 className="h1ModificarUsuario">Modifica tus datos</h1>
      <form onSubmit={(e) => formSubmit(e)} className="formpatchUsuarios">
        <label htmlFor="nombre" className="labelModificar">
          Modifica tu nombre {usuarios.nombre}
        </label>
        <input
          className="inputModificarUsuario"
          type="text"
          id="nombre"
          name="nombre"
          defaultValue={usuarios.nombre}
        />
        <label htmlFor="email" className="labelModificar">
          Modifica tu correo electronico
        </label>
        <input
          className="inputModificarUsuario"
          type="email"
          id="email"
          name="email"
          defaultValue={usuarios.email}
        />
        <label htmlFor="password" className="labelModificar">
          Modifica tu contraseña
        </label>
        <input
          className="inputModificarUsuario"
          type="password"
          id="password"
          name="password"
          defaultValue={usuarios.password}
        />
        <input type="submit" value="SEND" className="botonModificarUsuario" />
      </form>
    </div>
  );
};

export default ModificarUsuario;
