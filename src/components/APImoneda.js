
import React,{useState ,useEffect} from 'react';

const APImoneda = () => {
     /*state*/ 
     const [moneda, setMoneda]=useState({});

     useEffect(()=>{
         consultarAPImoneda();
     },[]);

     const consultarAPImoneda = async()=>{
         try{
         const respuesta = await fetch("")
         const resultado = await respuesta.json();
         console.log(resultado)
         if(respuesta.status===200){
             console.log(resultado);
             setMoneda(resultado);
         }else{
             console.log("ocurrio un error")
         }
     }catch(error){
         console.log(error)
     }
}
         return (
        
      <div className="boxAPI d-flex justify-content-evenly align-items-center">
          <p>APImoneda</p>
          <p></p>
          <img />
      </div> 
     );
 };


export default APImoneda;