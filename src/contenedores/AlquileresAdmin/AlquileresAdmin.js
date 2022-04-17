import "./AlquileresAdmin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import actionCreator from "../../store/actionTypes";
import { useDispatch } from "react-redux";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const AlquileresAdmin = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();

  const [alquileres, setalquileres] = useState([]);
  const getAlquileres = async () => {
    const alquileresRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/alquileres/",
      {
        method: "GET",
      }
    );
    const datosalquileres = await alquileresRes.json();
    setalquileres(datosalquileres);
  };
  useEffect(() => {
    try {
      getAlquileres();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const cancelarAlquiler = async (idAlquiler) => {
    try {
      await fetch(
        "https://clone-netflix-back.herokuapp.com/alquileres/" + idAlquiler,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getAlquileres();
      dispatch(actionCreator(VER_POPUP, "Has cancelado el alquiler"));
      setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div class="row d-flex fondo contenedor">
      <h3>Datos de los alquileres</h3>
      {alquileres.map((alquiler) => {
        return (
          <div class="col-sm-4 border border-warning rounded-pill p-1 mt-1 ">
            <h4>{alquiler.idPelicula.titulo}</h4>
            <div class="row">
              <span class="col-sm fw-bold">Película</span>
              <span class="col-sm">{alquiler.idPelicula.titulo}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Fecha de alquiler</span>
              <span class="col-sm">{alquiler.fecha_alquiler}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Fecha de devolución</span>
              <span class="col-sm">{alquiler.fecha_devolucion}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Usuario</span>
              <span class="col-sm">{alquiler.idUsuario.nombre}</span>
            </div>

            <div class="row d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-4 text-center me-1 rounded-pill"
                onClick={() => navegar("/modificarAlquiler/" + alquiler._id)}
              >
                Modificar Alquiler
              </button>
              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-4 text-center me-1 rounded-pill"
                onClick={() => cancelarAlquiler(alquiler._id)}
              >
                Cancelar Alquiler
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlquileresAdmin;
