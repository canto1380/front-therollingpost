
import React,{useState ,useEffect} from 'react';

const APImoneda = () => {
     /*state*/ 
     const [moneda, setMoneda]=useState({});

     useEffect(()=>{
         consultarAPImoneda();
     },[]);

     

     const consultarAPImoneda = async()=>{
         try{
         const respuesta = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
         const resultado = await respuesta.json();
         console.log(resultado)
         if(respuesta.status===200){
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
           <p>API moneda</p>
          {/* <p>{"dolar oficial"+ moneda[0].casa.compra }</p> */}
          <img />
      </div> 
     );
 };


export default APImoneda;