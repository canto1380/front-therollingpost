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
import Suscripcion from "./components/Suscripcion";
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
import { Container } from "react-bootstrap";

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

  /* Comentarios */
  const [comentario, setComentario]= useState([])
  const [consultarComent, setConsultarComent] = useState(true)

  /* Usuarios */
  const [tok, setTok] = useState('');
  const [consultarToken, setConsultarToken] = useState(true)


  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const { token } = JSON.parse(localStorage.getItem("jwt"))
      setTok(token)
    } else {
      console.log('usuario no registrado')
    }
  }, [consultarToken])

  /* Consultar API - Comentarios */
  useEffect(() => {
    const consultarAPIComent = async() =>{
      try {
        const res = await fetch(process.env.REACT_APP_API_URL +"/comentarios/listComentarios")
        const inforComentarios = await res.json();
        if(res.status===200) {
          setComentario(inforComentarios)
        }
      } catch (error) {
        console.log(error)
      }
    }
    consultarAPIComent()
  }, [consultarComent])
 
  /* Consulta API - categorias */
  useEffect(() => {
    const consultarAPICat = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_URL + "/categorias/listCategoria"
        );
        const inforCategorias = await res.json();
        if (res.status === 200) {
          setCategorias(inforCategorias);
        }
      } catch (error) {
        console.log(error);
      }
    };
    consultarAPICat();
  }, [consultarCat]);

  /* Consulta API - Noticias */
  useEffect(() => {
    consultarAPINoticias();
  }, [consultarNoticias, consultarCat]);

  const consultarAPINoticias = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/noticias/listNoticias"
      );
      const infNoticias = await res.json();
      if (res.status === 200) {
        setNoticias(infNoticias);
        const publicadas = infNoticias.filter(
          (noti) => noti.publicado === true
        );
        setNoticiasPublicadas(publicadas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <Navigation
            categorias={categorias}
            categoriasDestacadas={categoriasDestacadas}
            categoriasNoDestacadas={categoriasNoDestacadas}
            
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
              <Login
                consultarToken={consultarToken}
                setConsultarToken={setConsultarToken}
                tok={tok}
              />
            </Route>
            <Route exact path="/suscripcion">
              <Suscripcion individual={"$150"} familia={"$250"} clientes={clientes} consultarClientes={consultarClientes} setConsultarClientes={setConsultarClientes}
              />
            </Route>

            <Route exact path="/contactanos">
              <Contacto />
            </Route>
            <Route exact path="/acerca-de-nosotros">
              <AcercaDeNosotros />
            </Route>
            {categorias.map((cat) => (
              <Route
                key={cat._id}
                exact
                path={`/${cat.nombreCategoria}`}
              >
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
              <Noticia noticias={noticiasPublicadas} 
              comentario={comentario}
              setComentario={setComentario}
              setConsultarComent={setConsultarComent}
              consultarComent={consultarComent}
              />
            </Route>

            {/* Menu Admin */}
            {
            
              ((tok)) ? ( 
            <Route exact path={`/menu-categorias`}>
              <CategoriaMenu
                categorias={categorias}
                setConsultarCat={setConsultarCat}
                consultarCat={consultarCat}
                cantDestacadas={cantDestacadas}
                tok={tok}
                noticias={noticias}
                consultarNoticias={consultarNoticias}
                setConsultarNoticias={setConsultarNoticias}
              />
            </Route>
               ) : (
                <Error404/>
              )
            } 
            <Route exact path='/menu-categorias/addCategoria'>
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
            {
              ((tok)) ? (
              <Route exact path="/menu-noticias">
                <NoticiasMenu 
                  noticias={noticias}
                  consultarNoticias={consultarNoticias}
                  setConsultarNoticias={setConsultarNoticias}
                  tok={tok}
                />
              </Route>
              ) : (
                <Error404/>
              )

            }
            {
              ((tok)) ? (    
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
                <Error404/>
              )
            }
            <Route exact path="/preview/:id">
              <PreviewNoticia
               tok={tok}
              />
            </Route>
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
            <Route exact path="/contactenos">
              <Contacto></Contacto>
            </Route>
            <Route exact path="*">
              <Error404></Error404>
            </Route>
          </Switch>
        </div>
        <Footer categorias={categorias} />
      </div>
    </Router >
  );
}

export default App;
