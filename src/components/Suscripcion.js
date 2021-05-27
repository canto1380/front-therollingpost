import React, { useEffect, useRef, useState } from 'react';
import {Form, Button, Container, Card, FormGroup} from 'react-bootstrap';
import suscripcion from '../img/suscripcion.png'
import familia from '../img/familiar1.jpg'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'
import emailjs from 'emailjs-com'

const Suscripcion = (props) => {

  const {setConsultarClientes, clientes, setClientes}=props;

  const URL = process.env.REACT_APP_API_URL + "/clientes/suscripcion"

    /*variables ref*/
  const [nomAp, setNomAp]=useState("");
  const [direccion, setDireccion]=useState("");
  const [localidad, setLocalidad]= useState("");
  const [codigoPostal, setCodigoPostal]=useState(""); 
  const [telefono, setTelefono]= useState(0)
  const [email, setEmail]=useState("");
  const [password, setPassword]= useState("");
  const [plan, setPlan]=useState("");
  const [error, setError]= useState(false);

    /*States para feedback formulario*/
    const [emailValid, setEmailValid] = useState("")
    const [emailInValid, setEmailInValid] = useState("")
    const [passValid, setPassValid] = useState("")
    const [passInValid, setPassInValid] = useState("")
    const [termsInValid, setTermsInValid] = useState("")
    
    console.log(clientes)

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(email.trim()==="" || password.trim()==="" ){
          setError(true)
          console.log("ocurrio un error")
        }else{
          setError(false)
        }
          const cliente = {
            nomAp,
            direccion,
            localidad,
            codigoPostal,
            telefono,
            email,
            password,
            plan
          }
          console.log(cliente)
          
          try{
            const configuracion = {
              method: "POST" ,
              headers:{
                "Content-Type":"application/json"
              },
            body: JSON.stringify(cliente)
          };
          console.log(configuracion)

          const respuesta = await fetch (URL, configuracion);

          console.log(respuesta)
          if(respuesta.status===201){

              /*Enviar mensaje a administrador*/
            const mensajeSuscripcion = {
              nombre: nomAp,
              to_name: "Administrador",
              datos: `Direccion: ${direccion}
              Localidad: ${localidad}
              Codigo Postal: ${codigoPostal}
              Telefono: ${telefono}
              Email: ${email}
              Plan: ${plan}`,
            };
      
            console.log(mensajeSuscripcion);
      
            emailjs
              .send(
                "service_8p1isqq",
                "template_k4pd6gd",
                mensajeSuscripcion,
                "user_rQqHrh4fAD3sMZEdvbGTI"
              )
              .then(
                (result) => {
                  if (result.status === 200) {
                    Swal.fire(
                      'Solicitud de suscripcion enviada',
                      'Nos pondremos en contacto para confirmar aceptacion',
                      'success'
                    );
                  }
                  console.log(result);
                  
                },
                (error) => {
                  console.log(error.text);
                  Swal.fire(
                    'A ocurrido un error',
                    'Por favor intentelo de nuevo mas tarde',
                    'warning'
                  )}
              );

            // props.history.push("./");
            
            // Swal.fire(
            //   'Solicitud de suscripcion enviada',
            //   'Nos pondremos en contacto para confirmar aceptacion',
            //   'success'
            // )
            setConsultarClientes(true);
            console.log(clientes)
            e.target.reset();
          }

          
        }catch(err){
          console.log(err)
          Swal.fire(
            'A ocurrido un error',
            'Por favor intentelo de nuevo mas tarde',
            'error'
          )}
        }
        
        
        // setEmailValid(false)
        // setEmailInValid(true)
        // setPassValid(true)
        // setPassInValid(false)
        // setTermsInValid(true)
    

    const cambioPlan = (e)=>{
      setPlan(e.target.value)
    }
  


    return (
        <Container className="my-4">
          <div className="text-center my-3">
          <h1 className="text-primary ">Informate de verdad</h1>
          <h4 className="lead">Accedé sin límite a la informacion más confiable</h4>
          </div>
          <div className="row">
        <Card className="col-sm-12 col-md-6 col-lg-4">
        <div className="text-center my-3 mx-4">
          <h2>Acceso Digital individual</h2>
            <h3 className="text-primary">{props.individual}<span>/mes</span></h3>
          <img src={suscripcion} className="w-100" alt="" />
          </div>
          <hr />
          <div className="text-center my-3 mx-4">
          <h2>Acceso Digital grupo familiar</h2>
            <h3 className="text-primary">{props.familia}<span>/mes</span></h3>
          <img src={familia} className="w-100" alt="" />
          </div>
        </Card>
        <Card className="col-sm-12 col-md-6 col-lg-8">  
            <div className="mx-4 my-4">   
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><b>*Nombre y Apellido</b></Form.Label>
          <Form.Control type="text" placeholder="Ingrese su apellido y nombre"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setNomAp(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Dirección</b></Form.Label>
          <Form.Control type="text" placeholder="Ingrese su dirección"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setDireccion(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Localidad</b></Form.Label>
          <Form.Control type="text" placeholder="Ingrese la localidad donde vive"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setLocalidad(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Código Postal</b></Form.Label>
          <Form.Control type="number" placeholder="Ingrese su codigo postal"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setCodigoPostal(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Teléfono</b></Form.Label>
          <Form.Control type="number" placeholder="Ingrese su numero de telefono"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setTelefono(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> <b>*Email</b></Form.Label>
          <Form.Control type="email" placeholder="Ingrese su email"  isValid={emailValid} isInvalid={emailInValid} onChange={(e)=>setEmail(e.target.value)}  />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group  className="mt-2">
          <Form.Label><b>*Password</b></Form.Label>
          <Form.Control type="password" placeholder="Ingrese su contraseña"  isValid={passValid} isInvalid={passInValid} onChange={(e)=>setPassword(e.target.value)} />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Label className="my-3 "><b>*Seleccione su plan</b></Form.Label>
        <FormGroup >
        <Form.Check type="radio" name="plan de acceso" inline label="Plan de Acceso individual"  value="individual" onChange={cambioPlan} />
        <Form.Check type="radio" name="plan de acceso" inline label="Plan de Acceso Familiar"  value="familiar" onChange={cambioPlan} />
        </FormGroup>
        <Form.Group  className="mt-4">
      
          <Form.Check type="checkbox" label="Acepto términos y condiciones" />
        </Form.Group>
        <div className="d-flex justify-content-center my-4">
        <Button className="w-75 rounded-pill" variant="primary" type="submit">
          Suscribirme
        </Button>
          </div>
      </Form>
            </div>
            </Card>
        </div> 
      </Container>
    );
  };
  
export default withRouter(Suscripcion);