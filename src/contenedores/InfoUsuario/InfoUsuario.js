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
          <div className="usuariosCard">
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
            <div className="botonesOpciones">
              <button
                type="button"
                className="botonOpcionesUsuario"
                onClick={() => navegar("/modificarUsuario/" + usuario._id)}
              >
                Modificar datos
              </button>

              <button
                type="button"
                className="botonOpcionesUsuario"
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
