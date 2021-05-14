import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react'
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
import Login from './components/Login'
import Registro from './components/Registro'
import Suscripcion from './components/Suscripcion'
import CategoriaMenu from './components/CategoriaMenu'
import NoticiasMenu from './components/NoticiasMenu'
import SuscriptosMenu from './components/SuscriptosMenu'
import AgregarCategoria from './components/AgregarCategoria'
import { getToken } from "./helpers/helpers";

function App() {
  const url = process.env.REACT_APP_API_URL;
  /* Usuarios registrados */
  const [user, setUser] = useState([]);
  const [consultarUser, setConsultarUser] =useState(true)

  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] =useState(true)

  /* Usuario logueado */
  const [tok, setTok] = useState()
  const [consultar, setConsultar] = useState(false)
  
  console.log(consultar)
  /* Usado para tomar el token del usuario logueado */
  useEffect(()=>{
      const consultarLS =async ()=>{
        if(consultar){
          setTok(getToken())
          try {
            console.log(localStorage.getItem('jwt'))
            setTok(localStorage.getItem('jwt'))
            setConsultar(false)
          } catch (error) {
            console.log(error)
          }
        } 
        
      }
      consultarLS()
  },[consultar])
  console.log(tok)

  /* Consulta API sobre usuarios */
  useEffect(() => {
    if(consultarUser){
      const consultarAPI = async() =>{ 
        try {
          const res = await fetch(url+'/usuarios')
          const inforUser = await res.json()
           if(res.status === 200){
             setUser(inforUser)
             setConsultarUser(false)
           }
        } catch (error) {
          console.log(error)
        }
      }    
    consultarAPI()
    }
  },[consultarUser])
  
  /* Consulta API - categorias */
  useEffect(() => {
    if(consultarCat){
      const consultarAPI = async() =>{ 
        try {
          const res = await fetch(url+'/categorias')
          const inforCategorias = await res.json()
           if(res.status === 200){
             setCategorias(inforCategorias)
             setConsultarCat(false)
           }
        } catch (error) {
          console.log(error)
        }
      }    
    consultarAPI()
    }
  },[consultarCat])

  return (
    <Router>
      <Navigation
        setConsultar={setConsultar}
        tok={tok}
      />
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/inicio-sesion">
          <Login 
            user={user}
            setConsultar={setConsultar}
          />
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
        {/* Menu Admin */}
        <Route exact path="/menu-categorias/">
          <CategoriaMenu
            categorias={categorias}
            setConsultarCat={setConsultarCat}
          />
        </Route>
        <Route exact path="/menu-categorias/addCategoria">
          <AgregarCategoria
            categorias={categorias}
            setConsultarCat={setConsultarCat}
          />
        </Route>

        <Route exact path="/menu-noticias">
          <NoticiasMenu/>
        </Route>
        <Route exact path="/menu-suscriptos">
          <SuscriptosMenu/>
        </Route>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
