import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./common/nav/Navigation";
import Footer from "./common/Footer";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import AcercaDeNosotros from "./components/AcercaDeNosotros";
import Login from "./components/Login";
import Suscripcion from "./components/suscripcion/Suscripcion";
import CategoriaMenu from "./components/CategoriaMenu";
import NoticiasMenu from "./components/NoticiasMenu";
import SuscriptosMenu from "./components/SuscriptosMenu";
import AgregarCategoria from "./components/AgregarCategoria";
import EditarCategoria from "./components/EditarCategoria";
import PreviewNoticia from "./components/PreviewNoticia";
import AgregarNoticia from "./components/AgregarNoticia";
import EditarNoticia from "./components/EditarNoticia";
import Error404 from "./components/Error404";
import Noticia from "./components/noticiaIndividual/Noticia";
import APIclima from "./components/APIclima";
import APImoneda from "./components/APImoneda";
import CardCategorias from "./components/categoriaIndividual.js/CardCategorias";
import Registrarse from "./components/Registrarse";
import FormSuscripcion from "./components/suscripcion/FormSuscripcion";
import { Container } from "react-bootstrap";
import Region from "./components/region/Index";

import { consultarNoticiasPublicadasAPI } from "./utils/queryAPI/noticias";
import { consultarCategoriasPublicadasAPI } from "./utils/queryAPI/categorias";

// import ReactDOM from 'react-dom';
function App() {
  /*Clientes suscriptos*/
  const [clientes, setClientes] = useState([]);
  const [consultarClientes, setConsultarClientes] = useState(true);

  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] = useState(true);

  let categoriasDestacadas = categorias.filter((cat) => cat.destacada);
  let cantDestacadas = categoriasDestacadas.length;
  let categoriasNoDestacadas = categorias.filter((cat) => !cat.destacada);
  /* Noticias guardadas */
  const [noticias, setNoticias] = useState([]);
  const [noticiasPublicadas, setNoticiasPublicadas] = useState([]);
  const [consultarNoticias, setConsultarNoticias] = useState(true);

  let ultimaNoticia = noticiasPublicadas.slice(0, 1);
  let ultimasNoticias = noticiasPublicadas.slice(1, 3);

  /* Usuarios registrado */
  const [usuarios, setUsuarios] = useState([]);
  const [consultarUser, setConsultarUser] = useState(true);

  /* Comentarios */
  const [comentario, setComentario] = useState([]);
  const [consultarComent, setConsultarComent] = useState(true);

  /* Usuarios */
  const [tok, setTok] = useState([]);

  /* Suscripcion*/
  const [suscripcionElegida, setSuscripcionElegida] = useState('')

  const [idUsuario, setIdUsuario] = useState('')
  console.log(suscripcionElegida)
  useEffect(() => {
    setTok(JSON.parse(localStorage.getItem("jwt")));
  }, []);

  useEffect(() => {
    setIdUsuario(tok?.user?._id)
  },[tok])

  useEffect(() => {
    if (consultarUser) {
      consultarAPIUser();
    }
  }, [consultarUser]);
  const consultarAPIUser = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/user/listUser");
      const inforUsers = await res.json();
      if (res.status === 200) {
        setUsuarios(inforUsers);
        setConsultarUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Consultar API - Comentarios */
  useEffect(() => {
    if (consultarComent) {
      consultarAPIComent();
    }
  }, [consultarComent]);
  const consultarAPIComent = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/comentarios/listComentarios"
      );
      const inforComentarios = await res.json();
      if (res.status === 200) {
        setComentario(inforComentarios);
        setConsultarComent(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function renderComentarios() {
  //   if(consultarComent){
  //     consultarAPIComent()
  //   }
  // }
  // setInterval(renderComentarios, 10000);

  /* Consulta API - categorias */
  useEffect(() => {
    if (consultarCat) {
      consultarAPICat();
    }
  }, [consultarCat]);
  const consultarAPICat = async () => {
    try {
      setCategorias(await consultarCategoriasPublicadasAPI(setConsultarCat));
    } catch (error) {
      return error;
    }
  };
  // function renderCategorias() {
  //   if(consultarCat){
  //     consultarAPICat()
  //   }
  // }
  // setInterval(renderCategorias, 10000);

  /* Consulta API - Noticias */
  useEffect(() => {
    if (consultarNoticias) {
      consultarAPINoticias();
    }
  }, [consultarNoticias]);

  const consultarAPINoticias = async () => {
    try {
      setNoticiasPublicadas(
        await consultarNoticiasPublicadasAPI(setConsultarNoticias)
      );
    } catch (error) {
      return error;
    }
  };
  // function renderNoticias() {
  //   if(consultarNoticias){
  //     consultarAPINoticias()
  //   }
  // }
  // setInterval(renderNoticias, 10000);
  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <Navigation
            categorias={categorias}
            categoriasDestacadas={categoriasDestacadas}
            categoriasNoDestacadas={categoriasNoDestacadas}
            tok={tok}
            setTok={setTok}
          />
          <Container>
            <div className=" row mx-0">
              <div className=" col-sm-12 col-md-6 ps-3 ps-md-0">
                <APImoneda></APImoneda>
              </div>
              <div className="col-sm-12 col-md-6 pe-0 ">
                <APIclima></APIclima>
              </div>
            </div>
          </Container>

          <Switch>
            <Route exact path="/">
              <Inicio
                noticias={noticiasPublicadas}
                consultarCat={consultarCat}
                setConsultarNoticias={setConsultarNoticias}
                categoriasDestacadas={categoriasDestacadas}
                ultimasNoticias={ultimasNoticias}
                ultimaNoticia={ultimaNoticia}
                comentario={comentario}
              />
            </Route>
            <Route exact path="/inicio-sesion">
              <Login setTok={setTok} />
            </Route>
            <Route exact path="/registrarse">
              <Registrarse
                usuarios={usuarios}
                consultarUser={consultarUser}
                setConsultarUser={setConsultarUser}
              />
            </Route>

            {/* SUSCRIPCIONES */}
              <Route exact path="/suscripcion">
                <Suscripcion
                  tok={tok}          
                  setSuscripcionElegida={setSuscripcionElegida}
                />
              </Route>
            <Route exact path="/suscripcion/suscribirse/:id">
              <FormSuscripcion
                tok={tok}
                idUsuario={idUsuario}
                suscripcionElegida={suscripcionElegida}
              />
            </Route>

            <Route exact path="/contactanos">
              <Contacto />
            </Route>
            <Route exact path="/acerca-de-nosotros">
              <AcercaDeNosotros />
            </Route>
            <Route exact path="/contactenos">
              <Contacto></Contacto>
            </Route>
            {categorias.map((cat) => (
              <Route key={cat._id} exact path={`/${cat.nombreCategoria}`}>
                <CardCategorias
                  categorias={categorias}
                  cat={cat}
                  noticias={noticiasPublicadas}
                  comentario={comentario}
                />
              </Route>
            ))}

            {/* Noticia individual */}
            <Route exact path="/noti/:cat/:id">
              <Noticia
                noticias={noticiasPublicadas}
                comentario={comentario}
                setComentario={setComentario}
                setConsultarComent={setConsultarComent}
                consultarComent={consultarComent}
              />
            </Route>

            {/* Menu Admin Categorias*/}
            {tok && tok?.user?.tipoUser === "ADMIN_ROLE" ? (
              <Route exact path={`/menu-categorias`}>
                <CategoriaMenu
                  categorias={categorias}
                  setConsultarCat={setConsultarCat}
                  consultarCat={consultarCat}
                  cantDestacadas={cantDestacadas}
                  tok={tok}
                  noticias={noticiasPublicadas}
                  consultarNoticias={consultarNoticias}
                  setConsultarNoticias={setConsultarNoticias}
                  aa={tok?.user?.tipoUser}
                />
              </Route>
            ) : (
              <Error404 />
            )}
            <Route exact path="/menu-categorias/addCategoria">
              <AgregarCategoria
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
                tok={tok}
              />
            </Route>
            <Route exact path="/menu-categorias/editarCategorias/:id">
              <EditarCategoria
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
                tok={tok}
              />
            </Route>

            {/* Admin Menu Noticias */}
            {tok && tok?.user?.tipoUser === "ADMIN_ROLE" ? (
              <Route exact path="/menu-noticias">
                <NoticiasMenu
                  noticias={noticias}
                  consultarNoticias={consultarNoticias}
                  setConsultarNoticias={setConsultarNoticias}
                  tok={tok}
                />
              </Route>
            ) : (
              <Error404 />
            )}
            <Route exact path="/menu-noticias/agregar-Noticia">
              <AgregarNoticia
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
                consultarNoticias={consultarNoticias}
                setConsultarNoticias={setConsultarNoticias}
                tok={tok}
              ></AgregarNoticia>
            </Route>
            <Route exact path="/editar-noticia/:id">
              <EditarNoticia
                consultarNoticias={consultarNoticias}
                setConsultarNoticias={setConsultarNoticias}
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
                tok={tok}
              ></EditarNoticia>
            </Route>
            <Route exact path="/preview/:id">
              <PreviewNoticia tok={tok} />
            </Route>

            {tok && tok?.user?.tipoUser === "ADMIN_ROLE" ? (
              <Route exact path="/menu-suscriptos">
                <SuscriptosMenu
                  clientes={clientes}
                  setClientes={setClientes}
                  consultarClientes={consultarClientes}
                  setConsultarClientes={setConsultarClientes}
                  tok={tok}
                />
              </Route>
            ) : (
              <Error404 />
            )}

            {/* Menu Region */}
            {tok && tok?.user?.tipoUser === "ADMIN_ROLE" ? (
              <Route exact path="/menu-region">
                <Region tok={tok} />
              </Route>
            ) : (
              <Error404 />
            )}

            <Route exact path="*">
              <Error404 />
            </Route>
          </Switch>
        </div>
        <Footer categorias={categorias} />
      </div>
    </Router>
  );
}

export default App;
