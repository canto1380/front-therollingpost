import React from 'react';
import { Link } from 'react-router-dom';

const Publicidad = (props) => {
    return (
           <Link to={'/'}>
                <img className="card-img-top" className=" mt-4 w-100" src={props.publicidad}  alt="publicidad"/>
            </Link>
                

    );
};

export default Publicidad;