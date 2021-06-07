import React, {useState} from 'react';
import { Container, Image, Form, Row, Col, ListGroup, Button } from 'react-bootstrap';
import LogoNR from "../../img/The Rolling Post.jpg";
import ItemComentarios from './ItemComentarios';
import Swal from 'sweetalert2'

const CardComentarios = (props) => {
    const {coment, comentLength, id, consultarComent, setConsultarComent} = props
    const url = process.env.REACT_APP_API_URL+'/comentarios/addComentario'
    const [comentario, setComentario] =useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            const nuevoComentario={
                comentario,
                idNoticia: id
            }
            const config = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(nuevoComentario)
            }
            const res = await fetch(url, config)
            if(res.status ===201){
                Swal.fire(
                    'Comentario agregado con exito!',
                    'SI',
                    'success'
                  )
                  setConsultarComent(!consultarComent)
                  e.target.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container fluid className="p-0">
            <div className="my-4 text-primary">
                <h4>Comentarios <span className="badge bg-primary">{comentLength}</span></h4>
            </div>
            <Form onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-between m-0 h-100">
                <Col xs={2} md={2} className="p-0 text-center">
                    <Image src={LogoNR} rounded className="text-center" width="110px"/>
                </Col>
                <Col xs={10} md={10}  className="">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" 
                            rows={3} 
                            onChange={(e) => setComentario(e.target.value)}
                            />
                        <Form.Text className="text-muted">
                            Para poder hacer un comentario, debe iniciar sesion previamente.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <div>
                <Col sm={12} className="my-3 px-3 text-end">
                    <Button type="submit">Enviar comentario</Button>                    
                </Col>
            </div>
            </Form>
            <hr className="my-2"/>
            <ListGroup className="my-3">
                {
                    coment.map((c)=>(
                            <ItemComentarios key={c._id} com={c}/>
                        
                    ))
                }
            </ListGroup>
        </Container>
    );
};

export default CardComentarios;