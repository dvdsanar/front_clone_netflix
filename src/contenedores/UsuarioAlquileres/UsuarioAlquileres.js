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
    <div className="alquileresCard">
      {alquileres.map((Alquiler) => {
        return (
          <div className="infoalquileres">
            <h3>Datos del alquiler de {Alquiler.idPelicula.titulo}</h3>
            <tr>
              <th>Película alquilada</th>
              <td>{Alquiler.idPelicula.titulo}</td>
              <th>Fecha de alquiler</th>
              <td>{Alquiler.fecha_alquiler}</td>
              <th>Fecha de devolución</th>
              <td>{Alquiler.fecha_devolucion}</td>
              <th>Año de estreno</th>
              <td>{Alquiler.idPelicula.año}</td>
              <th>Género</th>
              <td>{Alquiler.idPelicula.genero}</td>
              <th>Actores</th>
              <td>{Alquiler.idPelicula.actores}</td>
              <th>Actores</th>
              <td>{Alquiler.idPelicula.duracion}</td>
            </tr>
            <div className="botonesOpciones">
              <button
                type="button"
                className="botonOpcionesalquileres"
                onClick={() => navegar("/modificarAlquiler/" + Alquiler.id)}
              >
                Modificar datos de Alquiler
              </button>

              <button
                type="button"
                className="botonOpcionesalquileres"
                onClick={() => borrarAlquiler(Alquiler.id)}
              >
                Eliminar Alquiler
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsuarioAlquileres;
