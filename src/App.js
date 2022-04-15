import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home/Home.js";
import Header from "./componentes/Header/Header.js";
import Footer from "./componentes/Footer/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Registro from "./contenedores/Registro/Registro";
import Login from "./contenedores/Login/Login";
import PopUp from "./contenedores/PopUp/PopUp";
import AreaCliente from "./contenedores/AreaCliente/AreaCliente";
import ModificarAlquiler from "./contenedores/ModificarAlquiler/ModificarAlquiler";
import AlquilarPelicula from "./contenedores/AlquilarPelicula/AlquilarPelicula";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/areaCliente" element={<AreaCliente />}></Route>
          <Route
            path="/modificarAlquiler/:id"
            element={<ModificarAlquiler />}
          ></Route>
          <Route
            path="/alquilarPelicula"
            element={<AlquilarPelicula />}
          ></Route>
        </Routes>
        <PopUp />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
