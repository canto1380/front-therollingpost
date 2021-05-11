import React from 'react';
import { Link } from 'react-router-dom';
import LogoNR from "../img/Logo-NR.png";


const Publicidad = (props) => {
    return (
        
            
           <Link>
                <img className="card-img-top" className="mx-2 mt-4 w-100" src={props.publicidad}  alt="publicidad"/>
            </Link>
                

    );
};

export default Publicidad;