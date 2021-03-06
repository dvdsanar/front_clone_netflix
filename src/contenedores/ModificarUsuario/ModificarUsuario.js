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
        dispatch(actionCreator(VER_POPUP, "Has modificado tus datos"));
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
        setTimeout(() => navegar("/areaCliente"), 4000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div class="d-flex align-items-center justify-content-center fondo contenedor ">
      <div class="col-lg-12">
        <h1 class="row justify-content-center mb-5">Modifica tus datos</h1>
        <form onSubmit={(e) => formSubmit(e)} class="align-middle">
          <div class="row justify-content-center mt-2">
            <label htmlFor="nombre" class="col-lg-2 text-start">
              Modifica tu nombre:
            </label>
            <input
              class="col-lg-2"
              type="text"
              id="nombre"
              name="nombre"
              defaultValue={usuarios.nombre}
            />
          </div>
          <div class="row justify-content-center mt-2">
            <label htmlFor="email" class="col-lg-2 text-start">
              Modifica tu correo electronico:
            </label>
            <input
              class="col-lg-2"
              type="email"
              id="email"
              name="email"
              defaultValue={usuarios.email}
            />
          </div>
          <div class="row justify-content-center mt-2">
            <label htmlFor="password" class="col-lg-2 text-start">
              Modifica tu contrase??a:
            </label>
            <input
              class="col-lg-2"
              type="password"
              id="password"
              name="password"
              defaultValue={usuarios.password}
            />
          </div>
          <div class="row justify-content-center mt-4 mb-1">
            <input
              type="submit"
              value="Modificar"
              class="col-lg-3 btn btn-dark rounded-pill"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificarUsuario;
