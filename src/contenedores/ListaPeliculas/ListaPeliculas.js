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
    <div class="row p-1 mt-1 " className="fondo contenedor">
      <h3>Datos de las películas</h3>
      {peliculas.map((pelicula) => {
        return (
          <div class="col-sm-4 border border-warning rounded-pill p-1 mt-1">
            <div class="row">
              <span class="col-sm fw-bold">Película:</span>
              <span class="col-sm">{pelicula.titulo}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Año de estreno:</span>
              <span class="col-sm">{pelicula.año}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Género:</span>
              <span class="col-sm">{pelicula.genero}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Actores:</span>
              <span class="col-sm">{pelicula.actores}</span>
            </div>
            <div class="row">
              <span class="col-sm fw-bold">Duracion (min.):</span>
              <span class="col-sm">{pelicula.duracion}</span>
            </div>
            <div>
              <img
                src={pelicula.imagen}
                alt="Cartel de la película {pelicula.titulo}"
                width="250"
                height="300"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaPeliculas;
