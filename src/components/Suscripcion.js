import React, { useState } from 'react';
import {Form, Button, Container, Card, FormGroup} from 'react-bootstrap';
import suscripcion from '../img/suscripcion.png'
import familia from '../img/familiar1.jpg'
import Swal from 'sweetalert2';
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
=======
>>>>>>> validacionesForm
import {withRouter} from 'react-router-dom'
import emailjs from 'emailjs-com'
import MsjError from './MsjError'

const Suscripcion = (props) => {

  const {setConsultarClientes, clientes, setClientes}=props;

  const URL = process.env.REACT_APP_API_URL + "/clientes/suscripcion"

const [client, setClient]=useState({
  nomAp: "",
  direccion: "",
  localidad: "",
  codigoPostal: "",
  telefono: "",
  email: "",
  password:"",
  plan: ""
})
const [error, setError]= useState(false);
const [err, setErr] = useState(false) //mensaje de error en valicaciones general

const handleValores = (e)=>{
setClient({...client, [e.target.name]: e.target.value})
}

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
    const [invalidTerms, setInvalidTerms] = useState("")
    
    /*Expresiones regulares para validaciones*/
    const expresiones = {
      nombre: /^[a-zA-ZÀ-ÿ\s]{4,}$/,  // Letras y espacios, pueden llevar acentos.
      email:  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
      cp: /^[0-9]{4,8}$/,
      tel: /^[0-9]{10,15}$/,
      pas:/^[a-z0-9_-]{6,15}$/
    };

/*States para Validaciones*/
    const[vNom, setVNom]=useState(false)
    const[vDir, setVDir]=useState(false)
    const[vLoc, setVLoc]=useState(false)
    const[vCP, setVCP]=useState(false)
    const[vTel, setVTel]=useState(false)
    const[vEmail, setVEmail]=useState(false)
    const[vPass, setVPass]=useState(false)
    const[vPlan, setVPlan]=useState(false)
    const [terms, setTerms]=useState(false)
   
    const validarNombre = () =>{
      setNomValid("")
      setNomInvalid("")
      let nom = expresiones.nombre
      if(client.nomAp.trim() !=="" && nom.test(client.nomAp) && client.nomAp.length <=40){
        setNomValid(true)
        console.log("nombre valido")
        setVNom(true)
        
      }else{
        console.log("nombre invalido")
        setNomInvalid(true)
        setVNom(false)
        // return false
      }
    }
    const validarDireccion = ()=>{
      setDirecValid("");
      setDirecInvalid("");
      
      if(client.direccion.trim() !== ""  ){
        setDirecValid(true);
        console.log(" direccion valido")
        setVDir(true)
      }else{  
        setDirecInvalid(true)
        console.log(" direccion invalido")
        setVDir(false)
    }
  }
    const validarLocalidad =()=>{
      setLocInvalid("");
      setLocValid("");
      let local= expresiones.nombre
      if(client.localidad.trim() !== "" && local.test(client.localidad) ){
        console.log(" localidad valido")
        setLocValid(true);
        setVLoc(true)
      }else{
        console.log(" localidad invalido")
        setLocInvalid(true)
        setVLoc(false)
        
      }
    } 
    const validarCP =()=>{
      setCpInvalid("");
      setCpValid("");
      let codP= expresiones.cp;
      if(client.codigoPostal.trim() !=="" && codP.test(client.codigoPostal) ){
        console.log("cp valido")
        setCpValid(true);
       setVCP(true)
      }else{
        console.log("cp invalido")
        setCpInvalid(true);
        setVCP(false)
      }
    }   
    const validarTel = ()=>{
      setTelInvalid("");
      setTelValid("");
      let telef = expresiones.tel
      if(client.telefono.trim() !=="" && telef.test(client.telefono)){
        setTelValid(true);
        console.log("tel valido")
       setVTel(true)
      }else{
        console.log("tel invalido")
        setTelInvalid(true);
        setVTel(false)
      }
    } 
    const validarEmail = ()=>{
      setEmailInvalid("");
      setEmailValid("");
      let mail = expresiones.email
      if(client.email.trim() !=="" && mail.test(client.email) ){
        setEmailValid(true);
        console.log("email valido")
        setVEmail(true)
      }else{
        setEmailInvalid(true);
        setVEmail(false)
      }
    }
    const validarPass = ()=>{
      setPassValid("");
      setPassInvalid("");
      let pass = expresiones.pas
      if(client.password.trim()!=="" && pass.test(client.password)){
        setPassValid(true);
        console.log("pass valido")
        setVPass(true)
      }else{
        setPassInvalid(true);
        console.log("pass invalido")
       setVPass(false)
      }
    } 
    const validarPlan = (e)=>{
      if(client.plan!==""){
        console.log("plan elegido")
        setVPlan(true)
      }else{
        console.log("elija un plan")
        setVPlan(false)
      }
    } 
    const validarTerminos=(e)=>{
      setInvalidTerms("")
      if(e.target.checked){
        console.log("terminos aceptados")
        setTerms(true)
        
      }else{
        console.log("Tiene que aceptar terminos")
        setTerms(false)
        setInvalidTerms(true)
        
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
      setPassValid("");
      setPassInvalid("")
      setInvalidTerms("")
      setTerms(false)
      setVPlan(false)
      setVNom(false)
      setVDir(false)
      setVLoc(false)
      setVCP(false)
      setVTel(false)
      setVEmail(false)
      setVPass(false)
  }

  const terminos = (e)=>{
    setTerms(e.target.checked)
  }
    
const handleSubmit = async(e)=>{
        e.preventDefault();
   
      if(vNom && vDir && vLoc && vCP && vTel && vEmail && vPass && vPlan && terms){
        console.log("creando clientes")
        setError(false)

        const cliente = client
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
          const mensajeSuscripcion = {
            nombre: client.nomAp,
            email: client.email,
            to_name: "Administrador",
            direcLocalCp: `Direccion: ${client.direccion} -
            Localidad: ${client.localidad} -
            Código Postal: ${client.codigoPostal}`,
            telEmailPass: `Telefono: ${client.telefono} - 
            Email: ${client.email} - 
            Password: ${client.password}`,  
            plan: `Plan: ${client.plan}`
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
        console.log("debe validar todos los campos")
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
          <Form.Control 
          type="text" 
          placeholder="Ingrese su nombre y apellido" 
          name="nomAp" 
          onChange={handleValores}
          onBlur={validarNombre}  
          maxLength="40"  
          isValid={nomValid} 
          isInvalid={nomInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Dirección</b></Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Ingrese su dirección" 
          name="direccion" 
          onChange={handleValores}
          onBlur={validarDireccion}  
          maxLength="40"  
          isValid={direcValid} 
          isInvalid={direcInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Localidad</b></Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Ingrese la localidad donde vive"
          name="localidad" 
          onChange={handleValores}
          onBlur={validarLocalidad}  
          maxLength="40"  
          isValid={locValid} 
          isInvalid={locInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Código Postal</b></Form.Label>
          <Form.Control 
          type="number" 
          placeholder="Ingrese su codigo postal" 
          name="codigoPostal" 
          onChange={handleValores}
          onBlur={validarCP}  
          maxLength="8" 
          onInput={maxNum}   
          isValid={cpValid} 
          isInvalid={cpInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Datos incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label><b>*Teléfono</b></Form.Label>
          <Form.Control 
          type="number" 
          placeholder="Ingrese su numero de telefono"
          name="telefono" 
          onChange={handleValores}
          onBlur={validarTel}  
          maxLength="15" 
          onInput={maxNum}  
          isValid={telValid} 
          isInvalid={telInvalid} />
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Debe contener numero de area y telefono</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> <b>*Email</b></Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Ingrese su email"
          name="email" 
          onChange={handleValores}
          onBlur={validarEmail}  
          maxLength="40"  
          isValid={emailValid} 
          isInvalid={emailInvalid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Email incorrectos</Form.Control.Feedback> 
        </Form.Group>
        <Form.Group  className="mt-2">
          <Form.Label><b>*Password</b></Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Ingrese su contraseña"
          name="password" 
          onChange={handleValores}
          onBlur={validarPass}  
          maxLength="12"   
          isValid={passValid} 
          isInvalid={passInValid}/>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Su contraseña debe contener entre 6 y 12 caracteres, letras y numeros</Form.Control.Feedback> 
        </Form.Group>
        <Form.Label className="my-3 "><b>*Seleccione su plan</b></Form.Label>
        <FormGroup >
        <Form.Check 
        type="radio" 
        name="plan" 
        inline 
        label="Plan de Acceso individual"  
        value="individual" 
        onChange={handleValores} 
        onBlur={validarPlan} />
        <Form.Check
         type="radio" 
         name="plan" 
         inline 
         label="Plan de Acceso Familiar" 
          value="familiar" 
          onChange={handleValores} 
          onBlur={validarPlan}  />
        </FormGroup>
        <Form.Group  className="mt-4">
          <Form.Check.Input  
          type="checkbox" 
          checked={terms}
          label="Acepto términos y condiciones" 
          onChange={terminos} 
          onBlur={validarTerminos} 
          isInvalid={invalidTerms} />
          <Form.Check.Label>Acepto términos y condiciones</Form.Check.Label>
          <Form.Control.Feedback type="invalid"  className="text-danger small" >Debe aceptar términos y condiciones</Form.Control.Feedback>
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