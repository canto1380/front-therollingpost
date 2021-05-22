import React from 'react';
import { Link } from 'react-router-dom';

const Publicidad = (props) => {
    const {classnamehidden} = props
    return (
           <Link to={'/'} className={classnamehidden}>
                <img className="card-img-top" className="w-100" src={props.publicidad}  alt="publicidad"/>
            </Link>
                

    );
};

export default Publicidad;