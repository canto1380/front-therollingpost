import React from 'react';
import { Link } from 'react-router-dom';
import LogoNR from "../img/Logo-NR.png";


const Publicidad = (props) => {
    return (
        
            
           <Link className="mt-4">
                <img className="card-img-top w-100" src={props.publicidad}  alt="publicidad"/>
            </Link>
                

    );
};

export default Publicidad;