
import { config } from '@fortawesome/fontawesome-svg-core';
import React,{useState ,useEffect} from 'react';
import { Container } from 'react-bootstrap';

const APImoneda = () => {
     /*state*/ 
     const [oficial, setOficial]=useState({});
     const [blue, setBlue]=useState({});

     useEffect(()=>{
         consultarAPImoneda();
     },[]);

     const consultarAPImoneda = async()=>{
         try{  
         const respuesta = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
         const resultado = await respuesta.json();
        //  console.log(respuesta)
         if(respuesta.status===200){
             setOficial(resultado[0].casa);
             setBlue(resultado[1].casa)
            //  console.log(resultado)
            //  console.log(oficial)
            //  console.log(blue)
         }else{
             console.log("ocurrio un error")
         }
     }catch(error){
         console.log(error)
     }
}
         return (
            
<div className="d-flex justify-content-around align-items-center">
         
         <div><b>Dolar Oficial</b></div>
         <div className="mx-1">${oficial.compra} / ${oficial.venta}</div>
         <div className="mx-1"><b>Dolar Blue</b></div>
         <div>${blue.compra} / ${blue.venta}</div>
     </div>
        
      
     );
 };


export default APImoneda;