import React, { useEffect, useRef, useState } from 'react';
import {Form, Button, Container, Card, FormGroup} from 'react-bootstrap';
import suscripcion from '../img/suscripcion.png'
import familia from '../img/familiar1.jpg'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'
import emailjs from 'emailjs-com'

const Suscripcion = (props) => {

  const {setConsultarClientes, clientes, setClientes}=props;

  const URL = process.env.REACT_APP_API_URL + "/clientes/suscripcion"

    /*variables ref*/
  const nomApRef = useRef("");
  const direccionRef =useRef("");
  const localidadRef = useRef("");
  const codigoPostalRef=useRef(""); 
  const telefonoRef= useRef(0)
  const emailRef =useRef("");
  const passwordRef= useRef("");

  /*States*/
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

        if(emailRef.current.value.trim()==="" || passwordRef.current.value.trim()==="" ){
          setError(true)
          console.log("ocurrio un error")
        }else{
          setError(false)
        }
          const cliente = {
            nomAp: nomApRef.current.value,
            direccion: direccionRef.current.value,
            localidad: localidadRef.current.value,  
            codigoPostal: codigoPostalRef.current.value,
            telefono: telefonoRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
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
              nombre: nomApRef.current.value,
              email: emailRef.current.value,
              to_name: "Administrador",
              direcLocalCp: `Direccion: ${direccionRef.current.value} -
              Localidad: ${localidadRef.current.value} -
              Código Postal: ${codigoPostalRef.current.value}`,
              telEmailPass: `Telefono: ${telefonoRef.current.value} - 
              Email: ${emailRef.current.value} - 
              Password: ${passwordRef.current.value}`,  
              plan: `Plan: ${plan}`
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
          <h1 >Mantente al día con la noticias del mundo</h1>
          <h5 className="">Accedé sin límite a información de la mejor calidad</h5>
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
          <Form.Control type="text" ref={nomApRef} placeholder="Ingrese su nombre y apellido"  isValid={emailValid} isInvalid={emailInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Dirección</b></Form.Label>
          <Form.Control type="text" ref={direccionRef} placeholder="Ingrese su dirección"  isValid={emailValid} isInvalid={emailInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Localidad</b></Form.Label>
          <Form.Control type="text" ref={localidadRef} placeholder="Ingrese la localidad donde vive"  isValid={emailValid} isInvalid={emailInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Código Postal</b></Form.Label>
          <Form.Control type="number" ref={codigoPostalRef} placeholder="Ingrese su codigo postal"  isValid={emailValid} isInvalid={emailInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Teléfono</b></Form.Label>
          <Form.Control type="number" ref={telefonoRef} placeholder="Ingrese su numero de telefono"  isValid={emailValid} isInvalid={emailInValid} />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> <b>*Email</b></Form.Label>
          <Form.Control type="email" ref={emailRef} placeholder="Ingrese su email"  isValid={emailValid} isInvalid={emailInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group  className="mt-2">
          <Form.Label><b>*Password</b></Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Ingrese su contraseña"  isValid={passValid} isInvalid={passInValid}/>
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