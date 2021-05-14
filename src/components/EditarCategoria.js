import React, {useState, useEffect} from 'react';
import { ListGroup, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useParams, withRouter}  from 'react-router-dom';
import Swal from 'sweetalert2';
import {campoRequerido} from '../helpers/helpers'
import ItemCategoria from "./ItemCategoria";
import MsjError from "./MsjError";

const EditarCategoria = (props) => {
    
const {id}= useParams();
console.log(id);

/* State */
const [nombreCategoria, setNombreCat] = useState({});
const [categoria, setCategoria]=useState("");
const [err,setErr] = useState(false)

const URL = process.env.REACT_APP_API_URL+("/categorias/")+id;

let mensaje;

useEffect(()=>{
    consultarCategorias();
},[]);

const consultarCategorias= async()=>{
    try{
const respuesta = await fetch (URL);
console.log(respuesta);
if(respuesta.status===200){
    const resp = await respuesta.json();
    setNombreCat(resp)
}
    }catch(error){
        console.log(error);
       //agregar cartel sweetAlert
    }
}

const cambioCategoria = (e)=>{
     setCategoria(e.target.value)
};

const handleSubmit = async(e)=>{
    e.preventDefault();
   
     let catModificada = (categoria === "")?(nombreCategoria.nombreCategoria):(categoria);
     
     if(campoRequerido(catModificada)){
         setErr(false);
         try{
             const categoriaModificada = {
                 nombreCategoria : catModificada
             }
            
             const respuesta = await fetch(URL, {
                 method: "PUT",
                 headers: {"Content-Type":"application/json"},
                 body: JSON.stringify(categoriaModificada)
             })
             console.log(respuesta);

             if(respuesta.status===200){
            
                 Swal.fire(
                     'Categoria modificada',
                     'La categoria fue modificada correctamente',
                     'success'
                   )
                 
                 props.setConsultarCat(true);
                
                props.history.push("/menu-categorias");
             };
         }catch(error){
             console.log(error)
         }
     }else{
        setErr(true);
        mensaje = (
          <MsjError text1="Datos incorrectos" text2="Intentelo nuevamente." />
        );
      }
};
   
    return (
        <Container>
      <Row className="d-flex justify-content-between">
        <Col sm={12} lg={6}>
          <h1 className="mt-5">Editar Categoria</h1>
          <Form onSubmit={handleSubmit} className="my-3 p-3 border border-secundary">
            <Form.Group>
              <Form.Label>Nombre Categoria</Form.Label>
              <Form.Control type="text" defaultValue={nombreCategoria.nombreCategoria} onChange={cambioCategoria} />
            </Form.Group>
            <Button className="my-3 w-100" variant="primary" type="submit">
              Guardar
            </Button>
            <div>{mensaje}</div>
          </Form>
        </Col>
        <Col sm={12} lg={6}>
            <h1 className="mt-5">Categorias existentes</h1>
            <ListGroup className="my-3">
                {
                    props.categorias.map((cat) =><ItemCategoria cat={cat} key={cat.id} consultarCat={props.consultarCat}/>)
                }
            </ListGroup>
        </Col>
      </Row>
    </Container>

    );
};
export default withRouter (EditarCategoria);