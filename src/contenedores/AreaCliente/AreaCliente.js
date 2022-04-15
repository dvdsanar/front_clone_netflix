import "./AreaCliente.css";
import InfoUsuario from "../InfoUsuario/InfoUsuario";
import UsuarioAlquileres from "../UsuarioAlquileres/UsuarioAlquileres";

const AreaCliente = () => {
  return (
    <div className="areaCliente">
      <h2>Área de Cliente</h2>
      <h3>Información personal</h3>
      <div>
        <InfoUsuario />
      </div>
      <h3>Películas Alquiladas</h3>
      <UsuarioAlquileres />
    </div>
  );
};
export default AreaCliente;
