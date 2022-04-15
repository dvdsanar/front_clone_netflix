import "./AlquilarPelicula.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import actionCreator from "../../store/actionTypes";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const AlquilarPelicula = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const [peliculas, setPeliculas] = useState([]);

  const getpeliculas = async () => {
    const peliculasRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/peliculas/todas",
      {
        method: "GET",
      }
    );
    const peliculasData = await peliculasRes.json();
    setPeliculas(peliculasData);
  };
  useEffect(() => {
    try {
      getpeliculas();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        fecha_alquiler: e.target[0].value,
        fecha_devolucion: e.target[1].value,
        idPelicula: e.target[2].value,
        idUsuario: localStorage.getItem("id"),
      };

      const postPelicula = await fetch(
        "https://clone-netflix-back.herokuapp.com/alquileres",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (postPelicula) {
        console.log(formData);
        dispatch(actionCreator(VER_POPUP, "Has alquilado una película "));
        setTimeout(() => dispatch(actionCreator(CERRAR_POPUP)), 3000);
        navegar("/areaCliente");
      }
    } catch (error) {
      alert("no se ha cargado la bd " + error);
    }
  };
  return (
    <div className="crearCita">
      <h2 className="h2citaMascota">Cita para mascota</h2>
      <form onSubmit={(e) => formSubmit(e)} className="formCrearCita">
        <label className="labelCrearCita" htmlFor="fecha_alquiler">
          Fecha desde la que deseas alquilar la película
        </label>
        <input
          className="inputCrearCita"
          type="datetime"
          id="fecha_alquiler"
          name="fecha_alquiler"
          placeholder="aaaa-mm-dd"
        />
        <label className="labelCrearCita" htmlFor="fecha_devolucion">
          Fecha en la que deseas devolver la película
        </label>
        <input
          className="fecha"
          type="datetime"
          id="fecha_devolucion"
          name="fecha_devolucion"
          placeholder="aaaa-mm-dd"
        />
        <label className="labelCrearCita" htmlFor="seleccionar">
          Selecciona la Película que deseas alquilar
        </label>
        <select className="selectpeliculas">
          {peliculas.map((pelicula) => (
            <option value={pelicula._id}>{pelicula.titulo}</option>
          ))}
        </select>
        <input
          type="submit"
          value="Alquilar pelicula"
          className="botonCrearCita"
        />
      </form>
    </div>
  );
};

export default AlquilarPelicula;
