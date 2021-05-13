import React, {useState, useRef, useEffect} from 'react';
import { ListGroup, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import {Link, useParams, withRouter}  from 'react-router-dom';
import Swal from 'sweetalert2';
import {campoRequerido} from '../helpers/helpers'
import ItemCategoria from "./ItemCategoria";

const EditarCategoria = (props) => {

    

const {id}= useParams();
console.log(id);

/* State */
const [nombreCategoria, setNombreCat] = useState([])
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
     setNombreCat(e.target.value)
};

const handleSubmit = async(e)=>{
    e.preventDefault();
   
     let catModificada = (nombreCategoria=== "")?(nombreCategoria.nombreCategoria):(nombreCategoria);
     // //revisar el valor del destacado
     // let destacadoModificado = (categoriaDestacada === "")?(categorias.categoriaDestacada):(categorias);
     //validar los datos
     if(campoRequerido(catModificada)){
         //si esta todo bien hago request a la API
         setErr(false);
         try{
             const categoriaModificada = {
                 "nombreCategoria" : catModificada
             
                 // categoriaDestacada: destacadoModificado;
             }
            
             const respuesta = await fetch(URL, {
                 method: "PUT",
                 headers: {"Content-Type":"application/json"},
                 body: JSON.stringify(categoriaModificada)
             })
             console.log(respuesta);

             if(respuesta.status===200){
                 //mostrar un cartel de que se modifico efectivamente el producto
                 Swal.fire(
                     'Categoria modificada',
                     'La categoria fue modificada correctamente',
                     'success'
                   )
                 //actualizar los datos de la pagina listarProductos
                 props.consultarAPICategorias()
                 //quiero redireccionar a la pagina de productos
                 // props.history.push("/productos");
             };
         }catch(error){
             console.log(error)
         }
     }else{
         //si falla la validacion quiero mostrar un cartel de error
         setErr(true)
        //  mensaje;
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
                    props.categorias.map((cat) =><ItemCategoria cat={cat} key={cat.id} consultarAPICategorias={props.consultarAPICategorias}/>)
                }
            </ListGroup>
        </Col>
      </Row>
    </Container>

    );
};
export default EditarCategoria;