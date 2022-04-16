import "./AreaCliente.css";
import InfoUsuario from "../InfoUsuario/InfoUsuario";
import UsuarioAlquileres from "../UsuarioAlquileres/UsuarioAlquileres";
import "bootstrap/dist/css/bootstrap.min.css";

const AreaCliente = () => {
  return (
    <div className="fondo contenedor">
      <h2>Área de Cliente</h2>
      <h3>Información personal</h3>
      <div class="">
        <InfoUsuario />
      </div>
      <div class="">
        <UsuarioAlquileres />
      </div>
    </div>
  );
};
export default AreaCliente;
