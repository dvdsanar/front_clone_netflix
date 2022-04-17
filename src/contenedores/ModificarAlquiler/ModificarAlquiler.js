import "./ModificarAlquiler.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const ModificarAlquiler = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navegar = useNavigate();
  const [alquiler, setalquiler] = useState([]);
  const getalquiler = async () => {
    const alquilerRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/alquileres/alquiler/" +
        params.id,
      {
        method: "GET",
      }
    );
    const alquilerData = await alquilerRes.json();
    setalquiler(alquilerData);
  };
  useEffect(() => {
    try {
      getalquiler();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formSubmit = async (e) => {
    // hace que el submit no refresco de nuevo la pagina
    e.preventDefault();
    try {
      const formData = {
        fecha_alquiler: e.target[0].value,
        fecha_devolucion: e.target[1].value,
      };

      const patchalquiler = await fetch(
        "https://clone-netflix-back.herokuapp.com/alquileres/" + params.id,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (patchalquiler) {
        dispatch(
          actionCreator(
            VER_POPUP,
            "Has modificado el alquiler de " + alquiler.idPelicula.titulo
          )
        );
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
        setTimeout(() => navegar("/areaCliente"), 4000);
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div class="d-flex align-items-center justify-content-center fondo contenedor">
      <div class="col-lg-12">
        <h1 class="mb-5">Modifica los datos de tu alquiler</h1>
        <form onSubmit={(e) => formSubmit(e)} className="formModificaralquiler">
          <div class="row justify-content-center mt-2">
            <label class="col-lg-3 text-start" htmlFor="fecha_alquiler">
              Introduzca la fecha de inicio del alquiler
            </label>
            <input
              class="col-lg-3 text-center"
              type="text"
              id="fecha_alquiler"
              name="fecha_alquiler"
              defaultValue={alquiler.fecha_alquiler}
            />
          </div>
          <div class="row justify-content-center mt-2">
            <label class="col-lg-3 text-start" htmlFor="fecha_devolucion">
              Introduzca la fecha de devolucion del alquiler
            </label>
            <input
              class="col-lg-3 text-center"
              type="text"
              id="fecha_devolucion"
              name="fecha_devolucion"
              defaultValue={alquiler.fecha_devolucion}
            />
          </div>
          <div class="row justify-content-center mt-4 mb-1">
            <input
              type="submit"
              value="Modificar"
              class="col-lg-1 btn btn-dark rounded-pill"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModificarAlquiler;
