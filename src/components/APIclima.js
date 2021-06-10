import React, { useState, useEffect } from 'react';

const APIclima = () => {
   
    /*state*/ 
    const [clima, setClima]=useState({});
    const [temp, setTtemp]=useState({})
    const [icon, setIcon]= useState({})

    useEffect(()=>{
            consultarAPIclima();
    },[]);

    const consultarAPIclima = async()=>{
        try{
        const respuesta = await fetch("http://api.openweathermap.org/data/2.5/weather?q=tucuman&appid=b762cedf16cfde81617a989380dd0bd9&lang=es&units=metric")
        const resultado = await respuesta.json();
        // console.log(resultado)
        if(respuesta.status===200){
            setClima(resultado);
            setTtemp(resultado.main)
            setIcon(resultado.weather[0])
            
        }else{
            console.log("ocurrio un error")
        }
    }catch(error){
        console.log(error)
    }
     };

    return (   
    <div className="d-flex  justify-content-center justify-content-lg-end align-items-center">
        <div>
            <img src={"http://openweathermap.org/img/w/"+ icon.icon +".png"} height="70px" alt="imagen clima"/>
        </div>
     <span className="badge rounded-pill bg-info">
        <div className="mx-1 pt-1 ">
          <h6><i>{temp.temp +" °C "}{clima.name}</i> </h6> 
        </div>
      </span>
     </div> 
    );
};

export default APIclima;