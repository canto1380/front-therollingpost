import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./common/nav/Navigation";
import Footer from "./common/Footer";
import Inicio from "./components/Inicio";
import Contacto from "./components/Contacto";
import AcercaDeNosotros from "./components/AcercaDeNosotros";
import Login from './components/Login'
import Registro from './components/Registro'
import Suscripcion from './components/Suscripcion'
import CategoriaMenu from './components/CategoriaMenu'
import NoticiasMenu from './components/NoticiasMenu'
import SuscriptosMenu from './components/SuscriptosMenu'
import AgregarCategoria from './components/AgregarCategoria'
import EditarCategoria from "./components/EditarCategoria";
import PreviewNoticia from "./components/PreviewNoticia";
import AgregarNoticia from "./components/AgregarNoticia";
import EditarNoticia from "./components/EditarNoticia";
import FormFeedback from "./components/pruebaFeedback";
import Noticia from "./components/noticiaIndividual/Noticia";
import APIclima from "./components/APIclima";
import APImoneda from "./components/APImoneda";
import CardCategorias from "./components/categoriaIndividual.js/CardCategorias";


function App() {

  const url = process.env.REACT_APP_API_URL;
  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] = useState(true);

  const [consultar, setConsultar] = useState(true)

  const [tok, setTok]=useState([]);

  const [user, setUser]= useState([])
  const [consultarUser, setConsultarUser] = useState(true)

  /*Clientes suscriptos*/
  const [clientes, setClientes]=useState([]);
  const [consultarClientes, setConsultarClientes]= useState(true)

  let categoriasDestacadas = categorias.filter(cat => cat.destacada)
  let cantDestacadas = categoriasDestacadas.length
  let categoriasNoDestacadas = categorias.filter(cat => !cat.destacada)
  console.log(categorias)
  /* Noticias guardadas */
  const [noticias, setNoticias] = useState([])
  const [consultarNoticias, setConsultarNoticias] = useState(true)
  
  let ultimasNoticias = noticias.filter( not => not.categoria ==="Deportes")

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

  console.log(consultar);
  /* Usado para tomar el token del usuario logueado */
  useEffect(() => {
    const consultarLS = async () => {
      if (consultar) {
        // setTok(getToken());
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
          const res = await fetch(url + "/usuarios");
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
  }
,[consultarUser])

  /* Consulta API - Noticias */
  useEffect(() => {
    const consultarAPINoticias = async() =>{
      try {
        const res = await fetch(process.env.REACT_APP_API_URL+"/noticias/listNoticias")
        const infNoticias = await res.json()
        if(res.status === 200){
          setNoticias(infNoticias)
        }
      } catch (error) {
        console.log(error)
      }
    }
     consultarAPINoticias() 
  }, [consultarNoticias])



/*ConsultarAPI -Clientes*/

  useEffect (()=>{
    if(consultarClientes){
      const consultarAPI = async()=> {
        try{
          const respuesta = await fetch (url + "/clientes/suscripcion");
          const infoClientes = await respuesta.json();
          console.log("todo ok")
          console.log(respuesta)
          if (respuesta.status ===200){
            console.log(infoClientes)
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
        <Route exact path="/noticia/idd">
          <Noticia/>
        </Route>

        {/* Menu Admin */}
        <Route exact path="/menu-categorias">
          <CategoriaMenu
            categorias={categorias}
            consultarCat={consultarCat}
            setConsultarCat={setConsultarCat}
            consultarCat={consultarCat}
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
        <Route exact path="/agregar-Noticia">
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
        <Route exact path="/feed">
          <FormFeedback></FormFeedback>
        </Route>
      </Switch>
      <Footer 
        categorias={categorias}
      />
    </Router>
  );
}

export default App;
