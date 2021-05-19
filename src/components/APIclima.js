import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const APIclima = () => {
   
    /*state*/ 
    const [clima, setClima]=useState({});
    const [temp, setTtemp]=useState({})
    const [icon, setIcon]= useState({})
    // const [consulta, setConsulta]=useState(false);

    useEffect(()=>{
            consultarAPIclima();

    },[]);

    const consultarAPIclima = async()=>{
        try{
        const respuesta = await fetch("http://api.openweathermap.org/data/2.5/weather?q=tucuman&appid=b762cedf16cfde81617a989380dd0bd9&lang=es&units=metric")
        const resultado = await respuesta.json();
        console.log(resultado)
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
        
    <div className="d-flex justify-content-center align-items-center">
        <div><img src={"http://openweathermap.org/img/w/"+ icon.icon +".png"} alt=""/></div>
        <div className="mx-1">{temp.temp +" °C"}</div>
            <div>{clima.name}</div> 
     </div> 
        
     
    );
};

export default APIclima;