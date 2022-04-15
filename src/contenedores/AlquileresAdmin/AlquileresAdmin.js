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
      dispatch(actionCreator(VER_POPUP, "Has cancelado la cita"));
      setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div className="alquileresCardAll">
      {alquileres.map((alquiler) => {
        return (
          <div className="infoalquileresAll">
            <h3>Datos de los alquileres</h3>
            <tr>
              <th>Película</th>
              <td>{alquiler.idPelicula.titulo}</td>
              <th>Fecha de alquiler</th>
              <td>{alquiler.fecha_alquiler}</td>
              <th>Fecha de devolución</th>
              <td>{alquiler.fecha_devolucion}</td>
              <th>Usuario</th>
              <td>{alquiler.idUsuario.nombre}</td>
            </tr>
            <div className="botonesOpcionesalquileresAll">
              <button
                type="button"
                className="botonalquileresAll"
                onClick={() => navegar("/modificarCita/" + alquiler.id)}
              >
                Modificar Alquiler
              </button>
              <button
                type="button"
                className="botonalquileresAll"
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
