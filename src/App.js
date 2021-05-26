import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./common/nav/Navigation";
import Footer from "./common/Footer";
import Inicio from "./components/Inicio";
import Deportes from "./components/Deportes";
import Policiales from "./components/Policiales";
import Actualidad from "./components/Actualidad";
import Politica from "./components/Politica";
import Contacto from "./components/Contacto";
import AcercaDeNosotros from "./components/AcercaDeNosotros";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Suscripcion from "./components/Suscripcion";
import CategoriaMenu from "./components/CategoriaMenu";
import NoticiasMenu from "./components/NoticiasMenu";
import SuscriptosMenu from "./components/SuscriptosMenu";
import AgregarCategoria from "./components/AgregarCategoria";
import { getToken } from "./helpers/helpers";
import EditarCategoria from "./components/EditarCategoria";
import PreviewNoticia from "./components/PreviewNoticia";
import AgregarNoticia from "./components/AgregarNoticia";
import EditarNoticia from "./components/EditarNoticia";
import Error404 from "./components/Error404";
import logoSpinner from "./img/The Rolling Post.jpg"
import Noticia from "./components/noticiaIndividual/Noticia";

import APIclima from "./components/APIclima";
import APImoneda from "./components/APImoneda";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_API_URL;

function App() {
  /* Usuarios registrados */
  const [user, setUser] = useState([]);
  const [consultarUser, setConsultarUser] = useState(true);

  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] = useState(true);

  let categoriasDestacadas = categorias.filter((cat) => cat.destacada);
  let cantDestacadas = categoriasDestacadas.length;
  let categoriasNoDestacadas = categorias.filter((cat) => !cat.destacada);

  /* Usuario logueado */
  const [tok, setTok] = useState();
  const [consultar, setConsultar] = useState(false);

  console.log(consultar);
  /* Usado para tomar el token del usuario logueado */
  useEffect(() => {
    const consultarLS = async () => {
      if (consultar) {
        setTok(getToken());
        try {
          console.log(localStorage.getItem("jwt"));
          setTok(localStorage.getItem("jwt"));
          setConsultar(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    consultarLS();
  }, [consultar]);
  console.log(tok);

  /* Consulta API sobre usuarios */
  useEffect(() => {
    if (consultarUser) {
      const consultarAPI = async () => {
        try {
          const res = await fetch(URL + "/usuarios");
          const inforUser = await res.json();
          if (res.status === 200) {
            setUser(inforUser);
            setConsultarUser(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      consultarAPI();
    }
  }, [consultarUser]);

  /* Consulta API - categorias */
  useEffect(() => {
    if (consultarCat) {
      const consultarAPI = async () => {
        try {
          const res = await fetch(URL + "/categorias");
          const inforCategorias = await res.json();
          if (res.status === 200) {
            setCategorias(inforCategorias);
            setConsultarCat(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      consultarAPI();
    }
  }, [consultarCat]);
  console.log(categorias);

  // Noticias
  const [noticias, setNoticias] = useState([]);

  const consultarAPI = useCallback(async () => {
    try {
      Swal.fire({
        imageUrl: logoSpinner,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Rolling Post Logo',
        title: 'Ya llega el diario.',
        showConfirmButton: false
      })
      const respuesta = await fetch(URL + "/noticias");
      const informacion = await respuesta.json();
      if (respuesta.status === 200) {
        setNoticias(informacion);
      }
    } catch (error) {
      console.log(error);
      //Cartel de error "Sweetalert" que lo vuelva a intentar en unos minutos
    }
    setTimeout(() => {
      Swal.close()
    },500);
  }, []);

  useEffect(() => {
    //llamar API
    consultarAPI();
  }, [consultarAPI]);

  return (
    <Router>
      <div className="page-container">
        <div className="content-wrap">
          <Navigation
            setConsultar={setConsultar}
            tok={tok}
            categorias={categorias}
            categoriasDestacadas={categoriasDestacadas}
            categoriasNoDestacadas={categoriasNoDestacadas}
          />

          <div className="boxAPI">
            <APImoneda></APImoneda>
            <APIclima></APIclima>
          </div>

          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>
            <Route exact path="/inicio-sesion">
              <Login user={user} setConsultar={setConsultar} />
            </Route>
            <Route exact path="/registro">
              <Registro />
            </Route>
            <Route exact path="/suscripcion">
              <Suscripcion />
            </Route>
            <Route exact path="/deportes">
              <Deportes />
            </Route>
            <Route exact path="/policiales">
              <Policiales />
            </Route>
            <Route exact path="/actualidad">
              <Actualidad />
            </Route>
            <Route exact path="/politica">
              <Politica />
            </Route>
            <Route exact path="/contactanos">
              <Contacto />
            </Route>
            <Route exact path="/acerca-de-nosotros">
              <AcercaDeNosotros />
            </Route>

            {/* Noticia individual */}
            <Route exact path="/noticia/idd">
              <Noticia />
            </Route>

            {/* Menu Admin */}
            <Route exact path="/menu-categorias">
              <CategoriaMenu
                categorias={categorias}
                setConsultarCat={setConsultarCat}
                cantDestacadas={cantDestacadas}
              />
            </Route>
            <Route exact path="/menu-categorias/addCategoria">
              <AgregarCategoria
                categorias={categorias}
                setConsultarCat={setConsultarCat}
              />
            </Route>
            <Route exact path="/menu-categorias/editarCategorias/:id">
              <EditarCategoria
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
              />
            </Route>
            <Route exact path="/menu-noticias">
              <NoticiasMenu noticias={noticias} consultarAPI={consultarAPI} />
            </Route>
            <Route exact path="/menu-suscriptos">
              <SuscriptosMenu noticias={noticias} consultarAPI={consultarAPI} />
            </Route>
            <Route exact path="/preview/:id">
              <PreviewNoticia></PreviewNoticia>
            </Route>
            <Route exact path="/agregar-Noticia">
              <AgregarNoticia
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
                consultarAPI={consultarAPI}
              ></AgregarNoticia>
            </Route>
            <Route exact path="/editar-noticia/:id">
              <EditarNoticia
                consultarAPI={consultarAPI}
                categorias={categorias}
                consultarCat={consultarCat}
                setConsultarCat={setConsultarCat}
              ></EditarNoticia>
            </Route>
            <Route exact path="*">
              <Error404></Error404>
            </Route>
            
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
