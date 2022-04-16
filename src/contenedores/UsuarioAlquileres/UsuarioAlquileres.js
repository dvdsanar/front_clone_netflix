import "./UsuarioAlquileres.css";
import { useEffect, useState } from "react";
//import CrearCita from "../CrearCita/CrearCita";
//import ModificarAlquiler from "../ModificarAlquiler/ModificarAlquiler.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const UsuarioAlquileres = () => {
  const getAlquileres = async () => {
    const alquileresRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/alquileres/" +
        localStorage.getItem("id"),
      {
        method: "GET",
      }
    );
    const alquileresData = await alquileresRes.json();

    return alquileresData;
  };
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const [alquileres, setalquileres] = useState([]);
  useEffect(() => {
    const loadAlquileres = async () => {
      try {
        const alquileres = await getAlquileres();
        setalquileres(alquileres);
      } catch (error) {
        console.log(error);
      }
    };
    loadAlquileres();
  }, []);
  const borrarAlquiler = async (idAlquiler) => {
    try {
      const deleteAlquiler = await fetch(
        "https://clone-netflix-back.herokuapp.com/alquileres/" + idAlquiler,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const alquileres = await getAlquileres();
      setalquileres(alquileres);
      if (deleteAlquiler) {
        dispatch(
          actionCreator(VER_POPUP, "Has borrado tu Alquiler correctamente")
        );
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };

  return (
    <div class="row p-1 mt-1 ">
      <h3>Películas Alquiladas</h3>
      {alquileres.map((Alquiler) => {
        return (
          <div class="col-sm-4 border border-warning rounded-pill p-1 mt-1">
            <h4>{Alquiler.idPelicula.titulo}</h4>
            <div class="row">
              <span class="col-sm fw-bold">Fecha de alquiler:</span>
              <span class="col-sm">{Alquiler.fecha_alquiler}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Fecha de devolución:</span>
              <span class="col-sm">{Alquiler.fecha_devolucion}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Año de estreno:</span>
              <span class="col-sm">{Alquiler.idPelicula.año}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Género:</span>
              <span class="col-sm">{Alquiler.idPelicula.genero}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Actores:</span>
              <span class="col-sm">{Alquiler.idPelicula.actores}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Duración:</span>
              <span class="col-sm">{Alquiler.idPelicula.duracion}</span>
            </div>

            <div class="row d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-4 text-center me-1 rounded-pill"
                onClick={() => navegar("/modificarAlquiler/" + Alquiler._id)}
              >
                Modificar datos de Alquiler
              </button>

              <button
                type="button"
                class="btn btn-secondary btn-sm col-sm-4 text-center me-1 rounded-pill"
                onClick={() => borrarAlquiler(Alquiler._id)}
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

export default UsuarioAlquileres;
