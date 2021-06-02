import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./common/nav/Navigation";
import Footer from "./common/Footer";
import Inicio from "./components/Inicio";
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
import FormFeedback from "./components/pruebaFeedback";
import Noticia from "./components/noticiaIndividual/Noticia";
import APIclima from "./components/APIclima";
import APImoneda from "./components/APImoneda";
import Swal from "sweetalert2";
import CardCategorias from "./components/categoriaIndividual.js/CardCategorias";
//import moment from 'moment'
const URL = process.env.REACT_APP_API_URL;

function App() {
  /* Usuarios registrados */
  const [user, setUser] = useState([]);
  const [consultarUser, setConsultarUser] = useState(true);

  const url = process.env.REACT_APP_API_URL;
  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] = useState(true);

  /*Clientes suscriptos*/
  const [clientes, setClientes]=useState([]);
  const [consultarClientes, setConsultarClientes]= useState(true)

  let categoriasDestacadas = categorias.filter(cat => cat.destacada)
  let cantDestacadas = categoriasDestacadas.length
  let categoriasNoDestacadas = categorias.filter(cat => !cat.destacada)
  
  /* Noticias guardadas */
  const [noticias, setNoticias] = useState([])
  const [consultarNoticias, setConsultarNoticias] = useState(true)

  noticias.sort(((a, b) => parseInt(a.hora) - parseInt(b.hora)));
  noticias.sort(((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha)));
  console.log(noticias)
  let ultimaNoticia=noticias.slice(noticias.length-1,noticias.length)
  let ultimasNoticias = noticias.slice(noticias.length-3,noticias.length-1)

  /* Usuarios */
  const [usuarios, setUsuarios] = useState([])
  const [consultarUsuarios, setConsultarUsuarios] = useState(true)
  const [tok, setTok]=useState([]);

  /* Consulta API - categorias */
useEffect(() => {
  const consultarAPICat = async() =>{ 
    try {
      const res = await fetch(process.env.REACT_APP_API_URL+"/categorias/listCategoria")
      const inforCategorias = await res.json()
       if(res.status === 200){
         setCategorias(inforCategorias)
       }
    } catch (error) {
      console.log(error)
    }
  };
      consultarAPICat();
  },[consultarCat]);


  /* Usado para tomar el token del usuario logueado */
  useEffect(() => {
    const consultarLS = async () => {
        try {
          setTok(localStorage.getItem("jwt"));
        } catch (error) {
          console.log(error);
        }
    };
    consultarLS();
  }, []);
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

  /* Consulta API - Noticias */
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
      } 
    }
  }, [consultarCat]);



  // Noticias

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
  
/* Consulta API - Usuarios */
useEffect(() => {
  const consultarAPIUsuarios = async() =>{
    try {
      const res = await fetch(process.env.REACT_APP_API_URL+"/user/listUser")
      const infUsuarios = await res.json()
      if(res.status === 200){
        setUsuarios(infUsuarios)
      }
    } catch (error) {
      console.log(error)
    }
  }
   consultarAPIUsuarios() 
}, [consultarUsuarios])

  useEffect(() => {
    //llamar API
    consultarAPI();
  }, [consultarAPI]);

/*ConsultarAPI -Clientes*/

  useEffect (()=>{
    if(consultarClientes){
      const consultarAPI = async()=> {
        try{
          const respuesta = await fetch (url + "/clientes/suscripcion");
          const infoClientes = await respuesta.json();
          if (respuesta.status ===200){
            setClientes(infoClientes);
            setConsultarClientes(false);
          }
        }catch(error){
          console.log(error);
        }
      }
      consultarAPI();
    };
  },[consultarClientes]);
  
  return (
    <Router>
<div className="page-container">
<div className="content-wrap">
      <Navigation
        categorias={categorias}
        noticias={noticias}
        categoriasDestacadas={categoriasDestacadas}
        categoriasNoDestacadas={categoriasNoDestacadas}
      />
    
      <div className="boxAPI">
        <APImoneda></APImoneda>
       <APIclima></APIclima> 
       </div>

      <Switch>
        <Route exact path="/">
          <Inicio
            noticias={noticias}
            consultarCat={consultarCat}
            setConsultarNoticias={setConsultarNoticias}
            categoriasDestacadas={categoriasDestacadas}
            ultimasNoticias={ultimasNoticias}
            ultimaNoticia={ultimaNoticia}
          />
        </Route>
        <Route exact path="/inicio-sesion">
          <Login/>
        </Route>
        <Route exact path="/registro">
          <Registro />
        </Route>
        <Route exact path="/suscripcion">
          <Suscripcion individual={"$150"} familia={"$250"} clientes={clientes} consultarClientes={consultarClientes}  setConsultarClientes={setConsultarClientes} />
        </Route>
        
        <Route exact path="/contactanos">
          <Contacto />
        </Route>
        <Route exact path="/acerca-de-nosotros">
          <AcercaDeNosotros />
        </Route>
        {
          categorias.map((cat)=>(
            <Route key={cat._id} exact path={`/${cat.nombreCategoria.toLowerCase()}`}>
            <CardCategorias
              cat={cat}
              noticias={noticias}
            />
            </Route>
          ))
        }
        {/* Noticia individual */}
        <Route exact path="/noti/:cat/:id">
          <Noticia/>
        </Route>

        {/* Menu Admin */}
        <Route exact path="/menu-categorias">
          <CategoriaMenu
            categorias={categorias}
            setConsultarCat={setConsultarCat}
            consultarCat={consultarCat}
            cantDestacadas={cantDestacadas}
          />
        </Route>
        <Route exact path='/menu-categorias/addCategoria'>
          <AgregarCategoria
            categorias={categorias}
            consultarCat={consultarCat}
            setConsultarCat={setConsultarCat}
          />
        </Route>
        <Route exact path="/menu-categorias/editarCategorias/:id">
          <EditarCategoria
            categorias={categorias}
            categoriasDestacadas={categoriasDestacadas}
            categoriasNoDestacadas={categoriasNoDestacadas}
          />
        </Route>
        {/* Menu Noticias */}
        <Route exact path="/menu-noticias">
        <NoticiasMenu noticias={noticias} consultarNoticias={consultarNoticias}  setConsultarNoticias={setConsultarNoticias} />
        </Route>
        <Route exact path="/menu-suscriptos">
        <SuscriptosMenu clientes={clientes} setClientes={setClientes}  consultarClientes={consultarClientes}  setConsultarClientes={setConsultarClientes} />
        </Route>
        <Route exact path="/preview/:id">
          <PreviewNoticia></PreviewNoticia>
        </Route>
        <Route exact path="/menu-noticias/agregar-Noticia">
          <AgregarNoticia
            categorias={categorias}
            consultarCat={consultarCat}
            setConsultarCat={setConsultarCat}
            consultarNoticias={consultarNoticias}
            setConsultarNoticias={setConsultarNoticias}
          ></AgregarNoticia>
        </Route>
        <Route exact path="/editar-noticia/:id">
          <EditarNoticia
            consultarNoticias={consultarNoticias}
            setConsultarNoticias={setConsultarNoticias}
            categorias={categorias}
            consultarCat={consultarCat}
            setConsultarCat={setConsultarCat}
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

    </Router>
  );
}
        
export default App;
