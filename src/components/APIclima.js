import React, { useState, useEffect } from 'react';

const APIclima = () => {
   
    /*state*/ 
    const [clima, setClima]=useState({});

    useEffect(()=>{
        consultarAPIclima();
    },[]);

    const consultarAPIclima = async()=>{
        try{
        const respuesta = await fetch("http://api.openweathermap.org/data/2.5/weather?q=tucuman&appid=b762cedf16cfde81617a989380dd0bd9&lang=es&units=metric")
        const resultado = await respuesta.json();
        console.log(resultado)
        if(respuesta.status===200){
            console.log(resultado);
            setClima(resultado);
        }else{
            console.log("ocurrio un error")
        }
    }catch(error){
        console.log(error)
    }

     };

    return (
     <div className="boxAPI d-flex justify-content-evenly align-items-center">
         <p>{clima.name}</p>
         <p>{clima.main.temp +" °C"}</p>
         <img src={"http://openweathermap.org/img/w/"+ clima.weather[0].icon +".png"} alt=""/>
     </div> 
    );
};

export default APIclima;