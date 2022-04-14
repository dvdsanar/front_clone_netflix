import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componentes/Home/Home.js";
import Header from "./componentes/Header/Header.js";
import Footer from "./componentes/Footer/Footer.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Registro from "./contenedores/Registro/Registro";
import Login from "./contenedores/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
