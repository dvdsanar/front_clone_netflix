import "./InfoUsuario.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
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
    setUsuarios(datosUsuario);
  };
  useEffect(() => {
    try {
      getUsuario();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {usuarios.map((usuario) => {
        return (
          <div class="row d-flex justify-content-center">
            <div class="col-auto border border-warning rounded-pill ps-5 pe-5 pt-1 pb-1">
              <div class="d-flex justify-content-left">
                <p class="fw-bold me-2">Nombre: </p>
                <p> {usuario.nombre}</p>
              </div>
              <div class="d-flex justify-content-left">
                <p class="fw-bold me-2">Email: </p>
                <p> {usuario.email}</p>
              </div>
              <div class="d-flex justify-content-center m-0">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm text-center me-1 rounded-pill"
                  onClick={() => navegar("/modificarUsuario/" + usuario._id)}
                >
                  Modificar datos
                </button>

                <button
                  type="button"
                  class="btn btn-secondary btn-sm  text-center ms-1 rounded-pill"
                  onClick={() => navegar("/alquilarPelicula")}
                >
                  Alquilar una película
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoUsuario;

//
