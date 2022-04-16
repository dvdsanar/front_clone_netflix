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
          <div class="container border border-warning rounded-pill p-1 ">
            <div class="row justify-content-center">
              <p class="col-lg-1 fw-bold">Nombre: </p>
              <p class="col-lg-1">{usuario.nombre}</p>
            </div>
            <div class="row justify-content-center">
              <p class="col-lg-1 fw-bold">Email: </p>
              <p class="col-lg-1">{usuario.email}</p>
            </div>
            <div class="row d-flex justify-content-center m-0">
              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-2 text-center me-1 rounded-pill"
                onClick={() => navegar("/modificarUsuario/" + usuario._id)}
              >
                Modificar datos
              </button>

              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-2 text-center ms-1 rounded-pill"
                onClick={() => navegar("/alquilarPelicula")}
              >
                Alquilar una película
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoUsuario;
