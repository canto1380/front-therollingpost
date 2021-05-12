import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./common/Navigation";
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

function App() {
  const url = process.env.REACT_APP_API_URL;
  /* Usuarios registrados */
  const [user, setUser] = useState([]);
  const [categorias, setCategorias] = useState([]);
  

  useEffect(() => {
    consultarAPI()
    consultarAPICategorias()
  }, [])

  /* Consulta API - Usuarios */
  const consultarAPI = async() =>{ 
      try {
        const res = await fetch(url+'/usuarios')
        const inforUser = await res.json()
         if(res.status === 200){
           setUser(inforUser)
         }
      } catch (error) {
        console.log(error)
      }
  }
  /* Consulta API - Categorias */
  const consultarAPICategorias = async() =>{ 
    try {
      const res = await fetch(url+'/categorias')
      const inforCategorias = await res.json()
       if(res.status === 200){
         setCategorias(inforCategorias)
       }
    } catch (error) {
      console.log(error)
    }
  }
console.log(categorias)

  
  return (
    <Router>
      <Navigation
      />
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/inicio-sesion">
          <Login 
            user={user}
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
            consultarAPICategorias={consultarAPICategorias}
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
