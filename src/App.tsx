import React from "react";
import Home from "./paginas/home/Home";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import Login from "./paginas/Login/Login";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagem'
import ListaTema from "./components/temas/listaTema/ListaTema";
import CadastroPost from "./components/postagens/cadastroPost/CadastroPost";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarPostagem from "./components/postagens/deletarPostagem/deletarPostagem";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import ListaPostagem from "./components/postagens/listaPostagens/ListaPostagem";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path="/postagens" element={<ListaPostagem />} />
          <Route path="/temas" element={<ListaTema />} />
          <Route path="/formularioPostagem" element={<CadastroPost />} />
          <Route path="/formularioPostagem/:id" element={<CadastroPost />} />
          <Route path="/formularioTema" element={<CadastroTema />} />
          <Route path="/formularioTema/:id" element={<CadastroTema />} />
          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
          <Route path="/deletarTema/:id" element={<DeletarTema />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
