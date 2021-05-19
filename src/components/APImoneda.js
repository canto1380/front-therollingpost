
import { config } from '@fortawesome/fontawesome-svg-core';
import React,{useState ,useEffect} from 'react';

const APImoneda = () => {
     /*state*/ 
     const [oficial, setOficial]=useState({});
     const [blue, setBlue]=useState({});

     useEffect(()=>{
         consultarAPImoneda();
     },[]);

    //  const of = await fetch("https://api.estadisticasbcra.com/usd_of")

     const consultarAPImoneda = async()=>{
         try{
            
               
         const respuesta = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
         const resultado = await respuesta.json();
         console.log(respuesta)
         if(respuesta.status===200){
             console.log(resultado[0]);
             setOficial(resultado[0].casa);
             setBlue(resultado[1].casa)
             console.log(resultado)
             console.log(oficial)
             console.log(blue)
         }else{
             console.log("ocurrio un error")
         }
     }catch(error){
         console.log(error)
     }
}
         return (
        
      <div className="boxAPI d-flex justify-content-evenly align-items-around small">
         
              <div>
              <p><b>Dolar Oficial</b></p>
              </div>
              <div>
              <p>compra:  ${oficial.compra}</p>
        <p>venta: ${oficial.venta}</p>
              </div>
              <div >
              <p><b>Dolar Blue</b></p>
              </div>
              <div >
              <p>Dolar Blue compra: ${blue.compra}</p>
          <p>Dolar Blue venta: ${blue.venta}</p>
              </div>

          </div>
             
         
      
     );
 };


export default APImoneda;