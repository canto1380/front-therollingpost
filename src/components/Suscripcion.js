import React, { useEffect, useRef, useState } from 'react';
import {Form, Button, Container, Card, FormGroup} from 'react-bootstrap';
import suscripcion from '../img/suscripcion.png'
import familia from '../img/familiar1.jpg'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import {withRouter} from 'react-router-dom'
import emailjs from 'emailjs-com'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import MsjError from './MsjError'

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
  const [err, setErr] = useState(false) //mensaje de error en valicaciones general

    /*States para feedback formulario*/
    const [nomValid, setNomValid]= useState("")
    const [nomInvalid, setNomInvalid]= useState("")
    const [direcValid, setDirecValid]= useState("")
    const [direcInvalid, setDirecInvalid]= useState("")
    const [locValid, setLocValid]= useState("")
    const [locInvalid, setLocInvalid]= useState("")
    const [cpValid, setCpValid]= useState("")
    const [cpInvalid, setCpInvalid]= useState("")
    const [telValid, setTelValid]= useState("")
    const [telInvalid, setTelInvalid]= useState("")
    const [emailValid, setEmailValid] = useState("")
    const [emailInvalid, setEmailInvalid] = useState("")
    const [passValid, setPassValid] = useState("")
    const [passInValid, setPassInvalid] = useState("")
    const [termsInValid, setTermsInValid] = useState("")
    
    /*Expresiones regulares para validaciones*/
    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{4,}$/,  // Letras y espacios, pueden llevar acentos.
      email:  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
      cp: /^[0-9]{4,8}$/,
      tel: /^[0-9]{8,15}$/,
      pas:/^[a-z0-9_-]{6,15}$/
    };


/*Validaciones*/

    const validarNombre = () =>{
      setNomValid("")
      setNomInvalid("")
      let nom = expresiones.nombre
      if(nomApRef.current.value.trim() !=="" & nom.test(nomApRef.current.value) & nomApRef.current.value.length <=40){
        setNomValid(true)
        console.log("nombre valido")
        return true
      }else{
        setNomInvalid(true)
        return false
      }
    }

    const validarDireccion = ()=>{
      setDirecValid("");
      setDirecInvalid("");
      let dir= expresiones.nombre
      if(direccionRef.current.value.trim() !== ""  ){
        setDirecValid(true);
        console.log(" direccion valido")
        return true;
      }else{  
        setDirecInvalid(true)
        console.log(" direccion invalido")
        return false;
    }
  }

    const validarLocalidad =()=>{
      setLocInvalid("");
      setLocValid("");
      let local= expresiones.nombre
      if(localidadRef.current.value.trim() !== "" & local.test(localidadRef.current.value) ){
        console.log(" localidad valido")
        setLocValid(true);
        return true
      }else{
        console.log(" localidad invalido")
        setLocInvalid(true)
        return false 
        
      }
    }

    const validarCP =()=>{
      setCpInvalid("");
      setCpValid("");
      let codP= expresiones.cp;
      if(codigoPostalRef.current.value.trim() !=="" & codP.test(codigoPostalRef.current.value) ){
        console.log("cp valido")
        setCpValid(true);
        return true
      }else{
        console.log("cp invalido")
        setCpInvalid(true);
        return false
      }
    } 
    const validarTel = ()=>{
      setTelInvalid("");
      setTelValid("");
      let telef = expresiones.tel
      if(telefonoRef.current.value.trim() !=="" & telef.test(telefonoRef.current.value)){
        setTelValid(true);
        console.log("tel valido")
        return true
      }else{
        setTelInvalid(true);
        return false
      }
    }

    const validarEmail = ()=>{
      setEmailInvalid("");
      setEmailValid("");
      let mail = expresiones.email
      if(emailRef.current.value.trim() !=="" & mail.test(emailRef.current.value) ){
        setEmailValid(true);
        console.log("email valido")
        return true
      }else{
        setEmailInvalid(true);
        return false
      }
    }
    const validarPass = ()=>{
      setPassValid("");
      setPassInvalid("");
      let pass = expresiones.pas
      if(passwordRef.current.value.trim()!=="" & pass.test(passwordRef.current.value)){
        setPassValid(true);
        console.log("pass valido")
        return true
      }else{
        setPassInvalid(true);
        console.log("pass invalido")
        return false
      }
    }

    const validarPlan = ()=>{
      
    }
    const validarTerminos=()=>{
      // let terms= document.getElementById("checkTerminos")
      // if(terms.checked)
    }
    

    const validarGeneral = ()=>{
      if(validarNombre & validarDireccion & validarLocalidad & validarCP & validarTel & validarEmail ){
        return true
      }else{
        return false
      }
    }

    //Limitar limite maximo de caracteres ingresados en el imput
  const maxNum = (num) => {
    if (num.target.value.length > num.target.maxLength) {
      num.target.value = num.target.value.slice(0, num.target.maxLength);
    }
  };

  /*limpiar states para estilos en formulario*/
  const clearForm = ()=>{
    setNomValid("")
      setNomInvalid("")
      setDirecValid("");
      setDirecInvalid("");
      setLocInvalid("");
      setLocValid("");
      setCpInvalid("");
      setCpValid("");
      setTelInvalid("");
      setTelValid("");
      setEmailInvalid("");
      setEmailValid("");
  }

  const cambioPlan = (e)=>{
    setPlan(e.target.value)
  }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();

      if(validarGeneral){
        setError(false)


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
              async(error) => {
                console.log(error.text);
                Swal.fire(
                  'A ocurrido un error',
                  'Por favor intentelo de nuevo mas tarde',
                  'warning'
                )
                const url = `${process.env.REACT_APP_API_URL}/clientes/buscar/${cliente.email}`;
                try {
                    const config ={
                        method:"DELETE",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    }
                    const res = await fetch(url, config)
                    console.log(res)
                    if(res.status === 200){
                      console.log("intente nuevamente")
              }
            }catch(error){
              console.log(error)
            }
          }
                
            );

          // props.history.push("./");
          
         
          setConsultarClientes(true);
          console.log(clientes)
          e.target.reset();
          clearForm();
        }

        
      }catch(err){
        console.log(err)
        Swal.fire(
          'A ocurrido un error',
          'Por favor intentelo de nuevo mas tarde',
          'error'
        )}
      }else{
        setError(true)
        setErr(true)
            setTimeout(() => {
                setErr(false)
            }, 2000);
      }   
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
          <Form.Control type="text" ref={nomApRef}  placeholder="Ingrese su nombre y apellido" onBlur={validarNombre}  maxLength="40"  isValid={nomValid} isInvalid={nomInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Dirección</b></Form.Label>
          <Form.Control type="text" ref={direccionRef} placeholder="Ingrese su dirección" onBlur={validarDireccion}  maxLength="40"  isValid={direcValid} isInvalid={direcInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Localidad</b></Form.Label>
          <Form.Control type="text" ref={localidadRef} placeholder="Ingrese la localidad donde vive" onBlur={validarLocalidad}  maxLength="40"  isValid={locValid} isInvalid={locInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Código Postal</b></Form.Label>
          <Form.Control type="number" ref={codigoPostalRef} placeholder="Ingrese su codigo postal" onBlur={validarCP}  maxLength="8" onInput={maxNum}   isValid={cpValid} isInvalid={cpInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Teléfono</b></Form.Label>
          <Form.Control type="number" ref={telefonoRef} placeholder="Ingrese su numero de telefono" onBlur={validarTel}  maxLength="15" onInput={maxNum}  isValid={telValid} isInvalid={telInvalid} />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> <b>*Email</b></Form.Label>
          <Form.Control type="email" ref={emailRef} placeholder="Ingrese su email" onBlur={validarEmail}  maxLength="40"  isValid={emailValid} isInvalid={emailInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group  className="mt-2">
          <Form.Label><b>*Password</b></Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Ingrese su contraseña" onBlur={validarPass}  maxLength="12"   isValid={passValid} isInvalid={passInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Su contraseña debe contener entre 6 y 12 caracteres, letras y numeros</Form.Control.Feedback> 
        </Form.Group>
        <Form.Label className="my-3 "><b>*Seleccione su plan</b></Form.Label>
        <FormGroup >
        <Form.Check type="radio" name="plan de acceso" inline label="Plan de Acceso individual"  value="individual" onChange={cambioPlan} />
        <Form.Check type="radio" name="plan de acceso" inline label="Plan de Acceso Familiar"  value="familiar" onChange={cambioPlan} />
        
        </FormGroup>
        <Form.Group  className="mt-4">
      
          <Form.Check type="checkbox" id="checkTerminos" label="Acepto términos y condiciones"  />
         
        </Form.Group>
        <div className="d-flex justify-content-center my-4">
        <Button className="w-75 rounded-pill" variant="primary" type="submit">
          Suscribirme
        </Button>
          </div>
          {
          (err) ? (<MsjError text1="Datos incorrectos" text2="Todos los campos son obligatorios." />) : (null)
          }
      </Form>
            </div>
            </Card>
        </div> 
      </Container>
    );
  };
  
export default withRouter(Suscripcion);