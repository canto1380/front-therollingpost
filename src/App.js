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

function App() {
  const url = process.env.REACT_APP_API_URL;
  /* Usuarios registrados */
  const [user, setUser] = useState([]);
  /* Usuario con sesion iniciada */

  useEffect(() => {
    consultarAPI()
  }, [])

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
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
