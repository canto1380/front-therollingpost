import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react'
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
// import { getToken } from "./helpers/helpers";
import EditarCategoria from "./components/EditarCategoria";

import Noticia from "./components/noticiaIndividual/Noticia";

import APIclima from "./components/APIclima";
import APImoneda from "./components/APImoneda";
import CardCategorias from "./components/categoriaIndividual.js/CardCategorias";


function App() {
  /* Categorias registradas */
  const [categorias, setCategorias] = useState([]);
  const [consultarCat, setConsultarCat] =useState(true)

  let categoriasDestacadas = categorias.filter(cat => cat.destacada)
  let cantDestacadas = categoriasDestacadas.length
  let categoriasNoDestacadas = categorias.filter(cat => !cat.destacada)

  /* Noticias guardadas */
  const [noticias, setNoticias] = useState([])
  const [consultarNoticias, setConsultarNoticias] = useState(true)
  
  let ultimasNoticias = noticias.filter( not => not.categoria ==="Deportes")

  /* Usuario logueado */
  // const [tok, setTok] = useState()

  /* Usado para tomar el token del usuario logueado */
  // useEffect(()=>{
  //     const consultarLS =async ()=>{
  //       if(consultar){
  //         setTok(getToken())
  //         try {
  //           console.log(localStorage.getItem('jwt'))
  //           setTok(localStorage.getItem('jwt'))
  //           setConsultar(false)
  //         } catch (error) {
  //           console.log(error)
  //         }
  //       } 
        
  //     }
  //     consultarLS()
  // },[consultar])
  // console.log(tok)

  /* Consulta API sobre usuarios */

// useEffect(() => {
//   fetch(url+"/categorias/listCategoria")
//   .then(res => res.json())
//   .then(json =>setCategorias(json))
// },[url])
// console.log(categorias)

// useEffect(() => {
//   fetch(url+"/noticias/listNoticias")
//   .then(res => res.json())
//   .then(json =>setNoticias(json))
// },[url])
// console.log(noticias)

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
  }
  consultarAPICat()
},[consultarCat])

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

  return (
    <Router>
      <Navigation
        // setConsultar={setConsultar}
        // tok={tok}
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

          <Suscripcion />
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
            setConsultarCat ={setConsultarCat}
          />
        </Route>
        <Route exact path="/menu-noticias">
          <NoticiasMenu/>
        </Route>
        <Route exact path="/menu-suscriptos">
          <SuscriptosMenu/>
        </Route>
      </Switch>
      <Footer 
        categorias={categorias}
      />
    </Router>
  );
}

export default App;
