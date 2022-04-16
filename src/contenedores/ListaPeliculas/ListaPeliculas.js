import "./ListaPeliculas.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import actionCreator from "../../store/actionTypes";
import { useDispatch } from "react-redux";
import { CERRAR_POPUP, VER_POPUP } from "../../store/types";

const ListaPeliculas = () => {
  const dispatch = useDispatch();
  const navegar = useNavigate();

  const [peliculas, setPeliculas] = useState([]);
  const getPeliculas = async () => {
    const peliculasRes = await fetch(
      "https://clone-netflix-back.herokuapp.com/peliculas/todas",
      {
        method: "GET",
      }
    );
    const datospeliculas = await peliculasRes.json();
    setPeliculas(datospeliculas);
  };
  useEffect(() => {
    try {
      getPeliculas();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="fondo contenedor">
      {peliculas.map((pelicula) => {
        return (
          <div className="infoalquileresAll">
            <h3>Datos de las películas</h3>
            <tr>
              <th>Película: </th>
              <td>{pelicula.titulo}</td>
              <th>Año de estreno: </th>
              <td>{pelicula.año}</td>
              <th>Género: </th>
              <td>{pelicula.genero}</td>
              <th>Actores: </th>
              <td>{pelicula.actores}</td>
              <th>Duracion (min.): </th>
              <td>{pelicula.duracion}</td>
              <th>Cartel: </th>
              <td>
                <img
                  src={pelicula.imagen}
                  alt="Girl in a jacket"
                  width="500"
                  height="600"
                />
              </td>
            </tr>
          </div>
        );
      })}
    </div>
  );
};

export default ListaPeliculas;
