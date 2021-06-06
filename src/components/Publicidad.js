import React from 'react';

const Publicidad = (props) => {
    const {classnamehidden} = props
    return (
           <a href={props.href} target="_blank"  rel="noreferrer" className={classnamehidden}>
                <img className="card-img-top w-100" src={props.publicidad}  alt="publicidad"/>
            </a>
    );
};

export default Publicidad;