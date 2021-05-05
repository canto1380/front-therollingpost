import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Inicio />
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
