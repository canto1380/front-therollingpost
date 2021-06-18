
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBillAlt} from '@fortawesome/free-regular-svg-icons';
import React,{useState ,useEffect} from 'react';

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
         if(respuesta.status===200){
             setOficial(resultado[0].casa);
             setBlue(resultado[1].casa)
         }else{
             console.log("ocurrio un error")
         }
     }catch(error){
         console.log(error)
     }
}
         return (    
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center my-2">
         
         <div className=" p-1 rounded border border-success border-4"><FontAwesomeIcon icon={faMoneyBillAlt} className=" me-1 text-success align-middle" size="2x"></FontAwesomeIcon><i><b> Dolar Oficial: </b>${oficial.compra} / ${oficial.venta}</i></div>
         <div className=" mx-1 p-1 rounded border border-primary border-4"><FontAwesomeIcon icon={faMoneyBillAlt} className="  me-1 text-primary align-middle " size="2x"></FontAwesomeIcon><i><b>Dolar Blue: </b>${blue.compra} / ${blue.venta}</i></div>
     </div>
     
      
     );
 };


export default APImoneda;